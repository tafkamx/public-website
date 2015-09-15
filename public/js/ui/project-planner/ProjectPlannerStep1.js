var Events = require('./../../lib/events');

Class(EM.UI, 'ProjectPlannerStep1').inherits(Widget).includes(BubblingSupport)({
    NAME : 'step1',
    ELEMENT_CLASS : 'project-planner__step',
    HTML : '\
        <div data-step="project-type">\
            <div class="project-planner__step-counter">1<span class="dim">/5</span></div>\
            <p class="project-planner__title -font-light">Pick as many as your project requires.</p>\
            <p class="project-planner__desc">You can select one or more if your project requires it. If you aren’t sure and want us to define that with you, then just select “I don’t know yet.”</p>\
            <div class="project-type-container -mt5 -mb5">\
                <button class="project-type-selector" data-projecttype="app">\
                    <svg stroke="url(#gradient-1)" stroke-width="2" fill="transparent" class="project-type-rect -abs -full-width -full-height">\
                        <rect x="0" y="0" width="100%" height="100%" rx="5" ry="5"/>\
                    </svg>\
                    <svg class="project-type-icon" stroke="url(#gradient-1)">\
                        <use xlink:href="#svg-cloud-stroke"></use>\
                    </svg>\
                    <p>Web / Desktop Application</p>\
                </button>\
                <button class="project-type-selector" data-projecttype="ecommerce">\
                    <svg stroke="url(#gradient-2)" stroke-width="2" fill="transparent" class="project-type-rect -abs -full-width -full-height">\
                        <rect x="0" y="0" width="100%" height="100%" rx="5" ry="5"/>\
                    </svg>\
                    <svg class="project-type-icon" stroke="url(#gradient-2)">\
                        <use xlink:href="#svg-commerce-stroke"></use>\
                    </svg>\
                    <p>E-Commerce</p>\
                </button>\
                <button class="project-type-selector" data-projecttype="brand">\
                    <svg stroke="url(#gradient-3)" stroke-width="2" fill="transparent" class="project-type-rect -abs -full-width -full-height">\
                        <rect x="0" y="0" width="100%" height="100%" rx="5" ry="5"/>\
                    </svg>\
                    <svg class="project-type-icon" stroke="url(#gradient-3)">\
                        <use xlink:href="#svg-brand-stroke"></use>\
                    </svg>\
                    <p>Brand Develpment</p>\
                </button>\
                <button class="project-type-selector" data-projecttype="mobile">\
                    <svg stroke="url(#gradient-4)" stroke-width="2" fill="transparent" class="project-type-rect -abs -full-width -full-height">\
                        <rect x="0" y="0" width="100%" height="100%" rx="5" ry="5"/>\
                    </svg>\
                    <svg class="project-type-icon" stroke="url(#gradient-4)">\
                        <use xlink:href="#svg-mobile-stroke"></use>\
                    </svg>\
                    <p>Mobile</p>\
                </button>\
                <div class="project-type__divider"></div>\
                <button class="project-type-selector" data-projecttype="none">\
                    <svg stroke="url(#gradient-1)" stroke-width="2" fill="transparent" class="project-type-rect -abs -full-width -full-height">\
                        <rect x="0" y="0" width="100%" height="100%" rx="5" ry="5"/>\
                    </svg>\
                    <p>I don’t know yet.</p>\
                </button>\
            </div>\
            <div class="-row -mb5">\
                <div data-back-btn-container class="-col-6"></div>\
                <div data-next-btn-container class="-col-6 -tar"></div>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.typeSelectorElements = [].slice.call(this.element.querySelectorAll('.project-type-selector'), 0);
            this.typeSelectorNone = this.element.querySelector('[data-projecttype="none"]');
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.Button({
                name : 'button',
                className : '-md -neutral-dark -pl5 -pr5',
                html : 'Next&nbsp;&nbsp;›'
            })).render(this.element.querySelector('[data-next-btn-container]')).disable();
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._toggleProjectTypeRef = this._toggleProjectType.bind(this);
            this.typeSelectorElements.forEach(function(el) {
                Events.on(el, 'click', this._toggleProjectTypeRef);
            }, this);

            this._buttonClickHandlerRef = this._buttonClickHandler.bind(this);
            Events.on(this.button.element, 'click', this._buttonClickHandlerRef);
        },

        _toggleProjectType : function _toggleProjectType(ev) {
            if (ev.currentTarget === this.typeSelectorNone) {
                this.typeSelectorElements.forEach(function(el) {
                    el.classList.remove('active');
                });
            } else {
                this.typeSelectorNone.classList.remove('active');
            }

            ev.currentTarget.classList.toggle('active');

            this._updateButtonState();
        },

        _updateButtonState : function _updateButtonState() {
            function selected(el) {
                if (el.classList.contains('active')) {
                    this.button.enable();
                    return true;
                }
            }

            if (this.typeSelectorElements.some(selected, this) === false) {
                this.button.disable();
            }
        },

        _buttonClickHandler : function _buttonClickHandler() {
            var types = this.typeSelectorElements.filter(function(el) {
                return el.classList.contains('active');
            }).map(function(el) {
                return el.dataset.projecttype;
            });

            var data = [{prop : 'type', value : types}];
            this.dispatch('setData', {data : data});
            this.dispatch('showPage', {name: EM.UI.ProjectPlannerStep2.NAME});
        },

        destroy : function destroy() {
            this.typeSelectorElements.forEach(function(el) {
                Events.off(el, 'click', this._toggleProjectTypeRef);
            }, this);
            this._toggleProjectTypeRef = null;

            Events.off(this.button.element, 'click', this._buttonClickHandlerRef);
            this._buttonClickHandlerRef = null;

            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});

var Events = require('./../../lib/events');

Class(EM.UI, 'ProjectPlannerStep1').inherits(Widget).includes(BubblingSupport)({
    NAME : 'step1',
    ELEMENT_CLASS : 'forms__step',
    HTML : '\
        <div>\
            <div class="page__container -rel">\
                <div class="project-planner__step-counter -grad-01">1/5</div>\
                <p class="project-planner__title -font-semi-bold">What would you like to build with us?</p>\
                <p class="project-planner__desc">You can select one or more mediums if your project requires it. If you are not sure and want us to define that with you, then just select <i>“I don’t know yet”</i>. We will help you figure out what the best approach is.</p>\
                <div class="project-type-container -mt5 -row">\
                    <div class="project-type-col">\
                        <button class="project-type-selector" data-projecttype="app">\
                            <svg stroke="url(#gradient-1)" stroke-width="2" vector-effect="non-scaling-stroke" fill="transparent" class="project-type-rect -abs -full-width -full-height">\
                                <rect x="0" y="0" width="100%" height="100%" rx="5" ry="5"/>\
                            </svg>\
                            <svg class="project-type-icon" stroke="url(#gradient-1)">\
                                <use xlink:href="#svg-cloud-stroke"></use>\
                            </svg>\
                            <p class="project-type-desc">Application &amp; Platform</p>\
                        </button>\
                    </div>\
                    <div class="project-type-col">\
                        <button class="project-type-selector" data-projecttype="ecommerce">\
                            <svg stroke="url(#gradient-2)" stroke-width="2" vector-effect="non-scaling-stroke" fill="transparent" class="project-type-rect -abs -full-width -full-height">\
                                <rect x="0" y="0" width="100%" height="100%" rx="5" ry="5"/>\
                            </svg>\
                            <svg class="project-type-icon" stroke="url(#gradient-2)">\
                                <use xlink:href="#svg-commerce-stroke"></use>\
                            </svg>\
                            <p class="project-type-desc">E-Commerce</p>\
                        </button>\
                    </div>\
                    <div class="project-type-col">\
                        <button class="project-type-selector" data-projecttype="brand">\
                            <svg stroke="url(#gradient-3)" stroke-width="2" vector-effect="non-scaling-stroke" fill="transparent" class="project-type-rect -abs -full-width -full-height">\
                                <rect x="0" y="0" width="100%" height="100%" rx="5" ry="5"/>\
                            </svg>\
                            <svg class="project-type-icon" stroke="url(#gradient-3)">\
                                <use xlink:href="#svg-brand-stroke"></use>\
                            </svg>\
                            <p class="project-type-desc">Brand Develpment</p>\
                        </button>\
                    </div>\
                    <div class="project-type-col">\
                        <button class="project-type-selector" data-projecttype="mobile">\
                            <svg stroke="url(#gradient-4)" stroke-width="2" vector-effect="non-scaling-stroke" fill="transparent" class="project-type-rect -abs -full-width -full-height">\
                                <rect x="0" y="0" width="100%" height="100%" rx="5" ry="5"/>\
                            </svg>\
                            <svg class="project-type-icon" stroke="url(#gradient-4)">\
                                <use xlink:href="#svg-mobile-stroke"></use>\
                            </svg>\
                            <p class="project-type-desc">Mobile App</p>\
                        </button>\
                    </div>\
                    <div class="project-type-col last">\
                        <div class="project-type__divider"></div>\
                        <button class="project-type-selector" data-projecttype="none">\
                            <svg stroke="url(#gradient-1)" stroke-width="2" vector-effect="non-scaling-stroke" fill="transparent" class="project-type-rect -abs -full-width -full-height">\
                                <rect x="0" y="0" width="100%" height="100%" rx="5" ry="5"/>\
                            </svg>\
                            <p>I don’t know yet.</p>\
                        </button>\
                    </div>\
                </div>\
            </div>\
            <div class="project-planner__footer">\
                <div class="page__container -rel">\
                    <div class="-row">\
                        <div data-back-btn-container class="-col-6"></div>\
                        <div data-next-btn-container class="-col-6 -tar"></div>\
                    </div>\
                </div>\
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
                className : '-md -neutral-dark -pl4 -pr4',
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
            }).join(', ');

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

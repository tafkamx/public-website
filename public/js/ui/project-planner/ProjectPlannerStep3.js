var Events = require('./../../lib/events');

Class(EM.UI, 'ProjectPlannerStep3').inherits(Widget).includes(BubblingSupport)({
    NAME : 'step3',
    ELEMENT_CLASS : 'project-planner__step deadline',
    HTML : '\
        <div data-step="deadline">\
            <div class="project-planner__step-counter">3<span class="dim">/5</span></div>\
            <p class="project-planner__title -font-light">Do you have a deadline?</p>\
            <p class="project-planner__desc">Doesn’t have to be a specific date. You can just type in an estimated date or even range of time. If you do not have a deadline you can leave this field blank and skip to the next step.</p>\
            <div class="-row -mt2 -mb5">\
                <div class="input-wrapper -col-7"></div>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.Input({
                name : 'inputDeadline',
                className : '-md -block',
                data : {attr : {placeholder: 'When would you like the project to be done?'}}
            })).render(this.element.querySelector('.input-wrapper'));

            this.appendChild(new EM.UI.Button({
                name : 'button',
                className : '-md -neutral-dark -pl5 -pr5 -mb1',
                html : 'Next&nbsp;&nbsp;›'
            })).render(this.element).disable();
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._updateButtonStateRef = this._updateButtonState.bind(this);
            Events.on(this.inputDeadline.element, 'keyup', this._updateButtonStateRef);

            this._buttonClickHandlerRef = this._buttonClickHandler.bind(this);
            Events.on(this.button.element, 'click', this._buttonClickHandlerRef);
        },

        _updateButtonState : function _updateButtonState() {
            if (this.inputDeadline.element.value.trim().length >= 3) {
                return this.button.enable();
            }

            this.button.disable();
        },

        _buttonClickHandler : function _buttonClickHandler() {
            var data = [{prop : 'deadLine', value : this.inputDeadline.getValue()}];
            this.dispatch('setData', {data : data});
            this.dispatch('showPage', {name: EM.UI.ProjectPlannerStep4.NAME});
        },

        destroy : function destroy() {
            Events.off(this.inputDeadline.element, 'keyup', this._updateButtonStateRef);
            this._updateButtonStateRef = null;

            Events.off(this.button.element, 'click', this._buttonClickHandlerRef);
            this._buttonClickHandlerRef = null;

            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});

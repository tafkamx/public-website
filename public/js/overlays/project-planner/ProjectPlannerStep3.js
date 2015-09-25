var Events = require('./../../lib/events');

Class(EM.UI, 'ProjectPlannerStep3').inherits(Widget).includes(BubblingSupport)({
    NAME : 'step3',
    ELEMENT_CLASS : 'overlay-form__container',
    HTML : '\
        <div>\
            <div class="-oa -full-height">\
                <div class="overlay-form-info-wrapper">\
                    <div class="page__container overlay-form-info-inner -rel">\
                        <div class="project-planner__step-counter -grad-03">3/5</div>\
                        <p class="overlay__title -font-semi-bold">Do you have a deadline?</p>\
                        <p class="overlay__desc">It doesn’t have to be a specific date. You can just type in an estimated date or even range of time, like <span class="-fsi">“In about 3 months”</span>.<br/>If you do not have a deadline you can leave this field empty and go on to the next step.</p>\
                        <div class="-row -mt5">\
                            <div class="input-wrapper"></div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <div class="overlay-form__footer">\
                <div class="overlay-form-inner -rel">\
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
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.Input({
                name : 'inputDeadline',
                className : '-md -block',
                data : {attr : {placeholder: 'When would you like the project to be launched?'}}
            })).render(this.element.querySelector('.input-wrapper'));

            this.appendChild(new EM.UI.Button({
                name : 'backButton',
                className : '-mini -gray -pl2 -pr2 -mt1',
                html : '‹&nbsp;Back'
            })).render(this.element.querySelector('[data-back-btn-container]'));

            this.appendChild(new EM.UI.Button({
                name : 'nextButton',
                className : '-md -neutral-dark -pl4 -pr4',
                html : 'Next&nbsp;&nbsp;›'
            })).render(this.element.querySelector('[data-next-btn-container]'));
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._backButtonClickHandlerRef = this._backButtonClickHandler.bind(this);
            Events.on(this.backButton.element, 'click', this._backButtonClickHandlerRef);

            this._nextButtonClickHandlerRef = this._nextButtonClickHandler.bind(this);
            Events.on(this.nextButton.element, 'click', this._nextButtonClickHandlerRef);
        },

        _backButtonClickHandler : function _backButtonClickHandler() {
            this.dispatch('showPage', {name: EM.UI.ProjectPlannerStep2.NAME});
        },

        _nextButtonClickHandler : function _nextButtonClickHandler() {
            var data = [{prop : 'deadLine', value : this.inputDeadline.getValue()}];
            this.dispatch('setData', {data : data});
            this.dispatch('showPage', {name: EM.UI.ProjectPlannerStep4.NAME});
        },

        destroy : function destroy() {
            Events.off(this.backButton.element, 'click', this._backButtonClickHandlerRef);
            this._backButtonClickHandlerRef = null;

            Events.off(this.nextButton.element, 'click', this._nextButtonClickHandlerRef);
            this._nextButtonClickHandlerRef = null;

            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});

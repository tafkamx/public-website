var Events = require('./../../lib/events');
var Capitalize = require('./../../lib/utils/capitalize');
var Checkit = require('checkit');

Class(EM.UI, 'ProjectPlannerStep5').inherits(Widget).includes(BubblingSupport)({
    NAME : 'step5',
    ELEMENT_CLASS : 'overlay-form__container',
    HTML : '\
        <div>\
            <div class="-oa -full-height">\
                <div class="overlay-form-info-wrapper">\
                    <div class="page__container overlay-form-info-inner -rel">\
                        <div class="project-planner__step-counter -grad-05">5/5</div>\
                        <p class="overlay__title -font-semi-bold">Finally, how can we reach you?</p>\
                        <p class="overlay__desc">To get this moving, tell us how can we get in touch and we will get back to you as soon as possible once we have reviewed and understood the information you entered here.</p>\
                        <div class="-row -pt4">\
                            <div data-row-a class="-col-6 -pr1"></div>\
                            <div data-row-b class="-col-6 -pl1"></div>\
                        </div>\
                        <div class="error-sending-form -pt1 -tac" style="display: none;">\
                            <span style="background-color: rgba(255, 0, 0, .05); padding: 1rem 2rem; display: inline-block;" class="-color-red">An error ocurred while submitting the form. Please try again.</span>\
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
            this.rowA = this.element.querySelector('[data-row-a]');
            this.rowB = this.element.querySelector('[data-row-b]');
            this.formError = this.element.querySelector('.error-sending-form');

            this._checkitProps = new Checkit({
                name : ['required'],
                email : ['required', 'email'],
                info : ['required']
            });

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.Input({
                name : 'inputName',
                className : '-md -block -mb1',
                data : {attr : {placeholder: 'Your name'}}
            })).render(this.rowA);

            this.appendChild(new EM.UI.Input({
                name : 'inputCompany',
                className : '-md -block -mb1',
                data : {attr : {placeholder: 'Company (optional)'}}
            })).render(this.rowA);

            this.appendChild(new EM.UI.Input({
                name : 'inputWebsite',
                className : '-md -block',
                data : {attr : {placeholder: 'Website (optional)'}}
            })).render(this.rowA);

            this.appendChild(new EM.UI.Input({
                name : 'inputEmail',
                className : '-md -block -mb1',
                data : {attr : {placeholder: 'Email'}}
            })).render(this.rowB);

            this.appendChild(new EM.UI.Input({
                name : 'inputPhone',
                className : '-md -block -mb1',
                data : {attr : {placeholder: 'Phone number (optional)'}}
            })).render(this.rowB);

            this.appendChild(new EM.UI.Input({
                name : 'inputInfo',
                className : '-md -block -mb1',
                data : {attr : {placeholder: 'How did you hear about us?'}}
            })).render(this.rowB);

            this.appendChild(new EM.UI.Button({
                name : 'backButton',
                className : '-mini -gray -pl2 -pr2 -mt1',
                html : '‹&nbsp;Back'
            })).render(this.element.querySelector('[data-back-btn-container]'));

            this.appendChild(new EM.UI.Button({
                name : 'nextButton',
                className : '-md -neutral-dark -pl4 -pr4',
                text : 'Let’s Do This!'
            })).render(this.element.querySelector('[data-next-btn-container]'));
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._backButtonClickHandlerRef = this._backButtonClickHandler.bind(this);
            Events.on(this.backButton.element, 'click', this._backButtonClickHandlerRef);

            this._buttonClickHandlerRef = this._buttonClickHandler.bind(this);
            Events.on(this.nextButton.element, 'click', this._buttonClickHandlerRef);
        },

        _backButtonClickHandler : function _backButtonClickHandler() {
            this.dispatch('showPage', {name: EM.UI.ProjectPlannerStep4.NAME});
        },

        _buttonClickHandler : function _buttonClickHandler() {
            this.formError.style.display = 'none';

            var validate = this._checkitProps.validateSync({
                name : this.inputName.getValue(),
                email : this.inputEmail.getValue(),
                info : this.inputInfo.getValue()
            });

            if (validate[0]) {
                return this._displayErrors(validate[0].errors);
            }

            var data = [
                {prop: 'infoName', value: this.inputName.getValue()},
                {prop: 'infoEmail', value: this.inputEmail.getValue()},
                {prop: 'infoCompany', value: this.inputCompany.getValue()},
                {prop: 'infoPhoneNumber', value: this.inputPhone.getValue()},
                {prop: 'infoWebsite', value: this.inputWebsite.getValue()},
                {prop: 'infoHowDidYouHearAboutUs', value: this.inputInfo.getValue()},
            ];
            this.dispatch('setData', {data : data});

            if (!this.spinnerWidget) {
                this.appendChild(new EM.UI.SpinnerBlocker({
                    name : 'spinnerWidget'
                })).render(this.element);
            }

            this.dispatch('sendForm', {
                callback: function(err) {
                    this.spinnerWidget = this.spinnerWidget.destroy();

                    if (err) {
                        this.formError.style.display = 'block';
                        return;
                    }

                    this.dispatch('showPage', {name: EM.UI.ProjectPlannerStep6.NAME});
                }.bind(this)
            });
        },

        _displayErrors : function _displayErrors(errors) {
            Object.keys(errors).forEach(function(propertyName) {
                var widget = 'input' + Capitalize(propertyName);
                this[widget].error();
            }, this);
        },

        destroy : function destroy() {
            this._checkitProps = null;

            Events.off(this.backButton.element, 'click', this._backButtonClickHandlerRef);
            this._backButtonClickHandlerRef = null;

            Events.off(this.nextButton.element, 'click', this._buttonClickHandlerRef);
            this._buttonClickHandlerRef = null;

            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});

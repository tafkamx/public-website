var Events = require('./../../lib/events');
var Capitalize = require('./../../lib/utils/capitalize');
var Checkit = require('checkit');

Class(EM.UI, 'ProjectPlannerStep5').inherits(Widget).includes(BubblingSupport)({
    NAME : 'step5',
    ELEMENT_CLASS : 'project-planner__step',
    HTML : '\
        <div>\
            <div class="project-planner__step-counter">5<span class="dim">/5</span></div>\
            <p class="project-planner__title -font-light">Finally, how can we reach you?</p>\
            <p class="project-planner__desc">To get this moving, tell us how can we get in touch and we will get back to you as soon as possible once we have reviewed and understood the information you entered here.</p>\
            <div class="-row -pt4 -pb5">\
                <div data-row-a class="-col-6 -pr1"></div>\
                <div data-row-b class="-col-6 -pl1"></div>\
            </div>\
            <div class="-row -mb5">\
                <div data-back-btn-container class="-col-6"></div>\
                <div data-next-btn-container class="-col-6 -tar"></div>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.rowA = this.element.querySelector('[data-row-a]');
            this.rowB = this.element.querySelector('[data-row-b]');

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
                className : '-md -neutral-dark -pl5 -pr5',
                html : '‹&nbsp;Back'
            })).render(this.element.querySelector('[data-back-btn-container]'));

            this.appendChild(new EM.UI.Button({
                name : 'nextButton',
                className : '-md -pink -pl5 -pr5 -mb1',
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

            this.dispatch('sendForm');
            this.dispatch('showPage', {name: EM.UI.ProjectPlannerStep6.NAME});
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

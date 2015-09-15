var Events = require('./../../lib/events');

Class(EM.UI, 'ProjectPlannerStep2').inherits(Widget).includes(BubblingSupport)({
    NAME : 'step2',
    ELEMENT_CLASS : 'project-planner__step',
    HTML : '\
        <div data-step="brief">\
            <div class="project-planner__step-counter">2<span class="dim">/5</span></div>\
            <p class="project-planner__title -font-light">What do you have in mind?</p>\
            <p class="project-planner__desc">Describe your idea with as much detail possible. Don’t be shy as it’ll help us determine how we can help you. You can also upload any material you think will support your description. Wireframes, documents or even your napkin doodles.</p>\
            <div class="project-description-wrapper -rel -mb5 -mt2">\
                <textarea class="project-planner__project-description ui-input -font-light -full-width" placeholder="Don\'t be shy :)"></textarea>\
                <div class="project-upload-files-bar">\
                    <input type="file" name="upload" class="-hide" multiple/>\
                    <button class="ui-btn -mini">Upload Files</button>\
                </div>\
            </div>\
            <div class="-row -mb5">\
                <div data-back-btn-container class="-col-6"></div>\
                <div data-next-btn-container class="-col-6 -tar"></div>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.inputMessage = this.element.querySelector('.project-planner__project-description');
            this.uploadButton = this.element.querySelector('.ui-btn.-mini');
            this.uploadFile = this.element.querySelector('[name="upload"]');
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.Button({
                name : 'backButton',
                className : '-md -neutral-dark -pl5 -pr5',
                html : '‹&nbsp;Back'
            })).render(this.element.querySelector('[data-back-btn-container]'));

            this.appendChild(new EM.UI.Button({
                name : 'sendButton',
                className : '-md -neutral-dark -pl5 -pr5',
                html : 'Next&nbsp;&nbsp;›'
            })).render(this.element.querySelector('[data-next-btn-container]')).disable();
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._triggerFileUploadRef = this._triggerFileUpload.bind(this);
            Events.on(this.uploadButton, 'click', this._triggerFileUploadRef);

            this._updateButtonStateRef = this._updateButtonState.bind(this);
            Events.on(this.inputMessage, 'keyup', this._updateButtonStateRef);

            this._backButtonClickHandlerRef = this._backButtonClickHandler.bind(this);
            Events.on(this.backButton.element, 'click', this._backButtonClickHandlerRef);

            this._nextButtonClickHandlerRef = this._nextButtonClickHandler.bind(this);
            Events.on(this.sendButton.element, 'click', this._nextButtonClickHandlerRef);
        },

        _triggerFileUpload : function _triggerFileUpload(ev) {
            this.uploadFile.click(ev);
        },

        _updateButtonState : function _updateButtonState() {
            if (this.inputMessage.value.trim().length >= 3) {
                return this.sendButton.enable();
            }

            this.sendButton.disable();
        },

        _backButtonClickHandler : function _backButtonClickHandler() {
            this.dispatch('showPage', {name: EM.UI.ProjectPlannerStep1.NAME});
        },

        _nextButtonClickHandler : function _nextButtonClickHandler() {
            var data = [{
                prop : 'description',
                value : this.inputMessage.value
            }, {
                prop : 'supportingFiles',
                value : this.uploadFile.files
            }];
            this.dispatch('setData', {data : data});
            this.dispatch('showPage', {name: EM.UI.ProjectPlannerStep3.NAME});
        },

        destroy : function destroy() {
            Events.off(this.inputMessage, 'keyup', this._updateButtonStateRef);
            this._updateButtonStateRef = null;

            Events.off(this.backButton.element, 'click', this._backButtonClickHandlerRef);
            this._backButtonClickHandlerRef = null;

            Events.off(this.sendButton.element, 'click', this._nextButtonClickHandlerRef);
            this._nextButtonClickHandlerRef = null;

            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});

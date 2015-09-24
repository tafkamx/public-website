var Events = require('./../../lib/events');
var addClass = require('./../../lib/utils/class-add');
var removeClass = require('./../../lib/utils/class-remove');

Class(EM.UI, 'ProjectPlannerStep2').inherits(Widget).includes(BubblingSupport)({
    NAME : 'step2',
    ELEMENT_CLASS : 'project-planner__step',
    HTML : '\
        <div>\
            <div class="page__container -rel">\
                <div class="project-planner__step-counter -grad-02">2/5</div>\
                <p class="project-planner__title -font-semi-bold">What do you have in mind?</p>\
                <p class="project-planner__desc">Describe your idea with as much detail possible. Don’t be shy as it’ll help us determine how we can help you. You can also upload any material you think will support your description. Wireframes, documents or even your napkin doodles.</p>\
                <div class="project-description-wrapper -rel -mt5">\
                    <textarea class="project-planner__project-description -font-light -full-width" placeholder="What’s your vision?"></textarea>\
                    <div class="project-upload-files-bar -row">\
                        <input type="file" name="upload" class="-hide" multiple/>\
                        <button class="ui-btn -mini -gray -fl"><span class="-rel">Attach files</span></button>\
                        <div class="pp-upload-files-feedback -pl1 -fsi">\
                            <p class="pp-upload-files-error -color-red -mb1">Sorry, what you have selected exceeds 15MB. Please keep it under this size.</p>\
                            <div class="pp-upload-files-list"></div>\
                        </div>\
                    </div>\
                </div>\
                <p class="pp-upload-files-limit-message -mt2 -fsi">The sum of all your files cannot exceed 15MB. If you have files larger than that, please link them in your message using other services like Droplr, Dropbox, etc.</p>\
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

    /* Max bytes allowed to upload. => 15 MB.
     */
    MAX_BYTE_SIZE: (1024 * 1024) * 15,

    prototype : {
        _files : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._files = [];

            this.inputMessage = this.element.querySelector('.project-planner__project-description');
            this.uploadButton = this.element.querySelector('.ui-btn.-mini');
            this.uploadFile = this.element.querySelector('[name="upload"]');
            this.uploadFilesError = this.element.querySelector('.pp-upload-files-error');

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.AttachFilesList({
                name : 'attachFilesList'
            })).render(this.element.querySelector('.pp-upload-files-list'));

            this.appendChild(new EM.UI.Button({
                name : 'backButton',
                className : '-mini -gray -pl2 -pr2 -mt1',
                html : '‹&nbsp;Back'
            })).render(this.element.querySelector('[data-back-btn-container]'));

            this.appendChild(new EM.UI.Button({
                name : 'sendButton',
                className : '-md -neutral-dark -pl4 -pr4',
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

            this._updateFilesFeedbackRef = this._updateFilesFeedback.bind(this);
            Events.on(this.uploadFile, 'change', this._updateFilesFeedbackRef);

            this._removeAttachmentRef = this._removeAttachment.bind(this);
            this.attachFilesList.bind('removeAttachment', this._removeAttachmentRef);
        },

        _triggerFileUpload : function _triggerFileUpload(ev) {
            this.uploadFile.click(ev);
        },

        _removeAttachment : function _removeAttachment(ev) {
            this._files.splice(ev.index, 1);
        },

        _updateFilesFeedback : function _updateFilesFeedback(ev) {
            var files = [].slice.call(ev.target.files,0);
            var totalBytes = 0;

            removeClass(this.uploadFilesError, 'active');

            files.forEach(function(file) {
                totalBytes += file.size;
            });

            if (this._files.length) {
                this._files.forEach(function(file) {
                    totalBytes += file.size;
                });
            }

            if (totalBytes >= this.constructor.MAX_BYTE_SIZE) {
                addClass(this.uploadFilesError, 'active');
                return;
            }

            files.forEach(function(file) {
                this._files.push(file);
            }, this);

            this.attachFilesList.flush().add(this._files);
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
                value : this._files
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

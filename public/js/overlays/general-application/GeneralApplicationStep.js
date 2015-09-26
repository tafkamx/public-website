var Events = require('./../../lib/events');
var addClass = require('./../../lib/utils/class-add');
var removeClass = require('./../../lib/utils/class-remove');
var Capitalize = require('./../../lib/utils/capitalize');
var Checkit = require('checkit');

Class(EM.UI, 'GeneralApplicationStep').inherits(Widget).includes(BubblingSupport)({
    NAME : 'step',
    ELEMENT_CLASS : 'overlay-form__container',
    HTML : '\
        <div>\
            <div class="-oa -full-height">\
                <div class="overlay-form-info-wrapper">\
                    <div class="page__container overlay-form-info-inner -rel">\
                        <p class="overlay__title -font-semi-bold">Hi! Tell us why we should join forces.</p>\
                        <p class="overlay__desc -mb2">We’re really careful when hiring. It can be a really fast process or a slow one. It all depends on the clarity of what you’ll submit in this first contact. We’re looking for people who really understand and live by our same principles. FYI, we don’t look for extensive years in experience or college titles. If you know you can bring value to people’s lives through your skills and talent, please go ahead and apply.</p>\
                        <p class="overlay-form-subtitle -font-semi-bold -mb1">A few tips that will help you:</p>\
                        <ul class="overlay__desc general-application__list">\
                            <li>Be specific and honest on why you are a good fit for us and our clients. No form letters please.</li>\
                            <li>Your resume should emphasize any pertinent experience you have.</li>\
                            <li>Bonus points for live links to current examples of your design in use.</li>\
                            <li>When showing examples of your work, explain your role, participation level and if possible a description of the process of building these projects. We appreciate technical skills but we’re most interested in the way you deal with problems and come up with solutions.</li>\
                        </ul>\
                        <div class="-row -pt4">\
                            <div data-row-a class="-col-6 -pr1"></div>\
                            <div data-row-b class="-col-6 -pl1"></div>\
                        </div>\
                        <div data-full-row></div>\
                        <p class="general-application__commas">Separate by commas. Your online portofolio, Dribbble, Behance, Github, Linkedin etc.</p>\
                        <div class="project-description-wrapper -rel">\
                            <textarea class="project-planner__project-description -font-light -full-width" placeholder="Why should we join forces?"></textarea>\
                        </div>\
                        <div class="project-planner__budget-radios -pt3 -row">\
                            <p class="overlay-form-subtitle -font-semi-bold -mb1">Are you willing to relocate to Guadalajara?</p>\
                            <div class="-fl -pr1">\
                                <label class="-clickable">\
                                    <input type="radio" name="can-relocate" value="Yes" checked/>\
                                    <span>&nbsp;Yes</span>\
                                </label>\
                            </div>\
                            <div class="-fl -pr1">\
                                <label class="-clickable">\
                                    <input  type="radio" name="can-relocate" value="No"/>\
                                    <span>&nbsp;No</span>\
                                </label>\
                            </div>\
                            <div class="-fl -pr1">\
                                <label class="-clickable">\
                                    <input  type="radio" name="can-relocate" value="LivesInGDL"/>\
                                    <span>&nbsp;I already live in GDL</span>\
                                </label>\
                            </div>\
                        </div>\
                        <div class="-row -pt3">\
                            <p class="overlay-form-subtitle -font-semi-bold -mb1">Upload your Resumé (optional)</p>\
                            <input type="file" name="upload" class="-hide" multiple/>\
                            <button class="ui-btn -mini -gray -fl"><span class="-rel">Attach files</span></button>\
                            <div class="pp-upload-files-feedback -pl1 -fsi">\
                                <p class="pp-upload-files-error -color-red -mb1">Sorry, what you have selected exceeds 15MB. Please keep it under this size.</p>\
                                <div class="pp-upload-files-list"></div>\
                            </div>\
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
                        <div data-submit-btn-container class="-col-12 -tar"></div>\
                    </div>\
                </div>\
            </div>\
        </div>',

    /* Max bytes allowed to upload. => 15 MB.
     */
    MAX_BYTE_SIZE: (1024 * 1024) * 15,

    MAX_SIZE_ERROR_MESSAGE : '<p class="-color-red">Sorry, what you have selected exceeds 15MB. Please keep it under this size.</p>',

    prototype : {
        _files : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._files = [];

            this.inputMessage = this.element.querySelector('.project-planner__project-description');
            this.radioElements = [].slice.call(this.element.querySelectorAll('[name="can-relocate"]'),0);
            this.uploadButton = this.element.querySelector('.ui-btn.-mini');
            this.uploadFile = this.element.querySelector('[name="upload"]');
            this.uploadFilesError = this.element.querySelector('.pp-upload-files-error');
            this.formError = this.element.querySelector('.error-sending-form');
            this._setup()._bindEvents();

            this._checkitProps = new Checkit({
                name: ['required'],
                email: ['required','email'],
                website: ['required'],
            });
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.AttachFilesList({
                name : 'attachFilesList'
            })).render(this.element.querySelector('.pp-upload-files-list'));

            this.appendChild(new EM.UI.Input({
                name : 'inputName',
                className : '-md -block -mb2',
                data : {attr : {placeholder: 'Your name'}}
            })).render(this.element.querySelector('[data-row-a]'));

            this.appendChild(new EM.UI.Input({
                name : 'inputEmail',
                className : '-md -block -mb2',
                data : {attr : {placeholder: 'Email'}}
            })).render(this.element.querySelector('[data-row-b]'));

            this.appendChild(new EM.UI.Input({
                name : 'inputWebsite',
                className : '-md -block',
                data : {attr : {placeholder: 'Websites or Profile URLs'}}
            })).render(this.element.querySelector('[data-full-row]'));

            this.appendChild(new EM.UI.Button({
                name : 'sendButton',
                className : '-md -neutral-dark -pl4 -pr4',
                html : 'Submit Application'
            })).render(this.element.querySelector('[data-submit-btn-container]'));

            return this;
        },

        _bindEvents : function _bindEvents() {
            this.radioElements.forEach(function(radio){
                Events.on(radio, 'change');
            },this);

            this._triggerFileUploadRef = this._triggerFileUpload.bind(this);
            Events.on(this.uploadButton, 'click', this._triggerFileUploadRef);

            this._updateFilesFeedbackRef = this._updateFilesFeedback.bind(this);
            Events.on(this.uploadFile, 'change', this._updateFilesFeedbackRef);

            this._buttonClickHandlerRef = this._buttonClickHandler.bind(this);
            Events.on(this.sendButton.element, 'click', this._buttonClickHandlerRef);
        },

        _buttonClickHandler : function _buttonClickHandler(){
            this.formError.style.display = 'none';

            var validate = this._checkitProps.validateSync({
                name: this.inputName.getValue(),
                email: this.inputEmail.getValue(),
                website: this.inputWebsite.getValue(),
            });

            if (validate[0]){
                return this._displayErrors(validate[0].errors);
            }

            var position = 0;
            for (var i=0; i<this.radioElements.length; i++){
                if (this.radioElements[i].checked) {
                    position = i;
                    i = this.radioElements.length;
                }
            }

            var data = [
                {prop: 'inputName', value : this.inputName.getValue()},
                {prop: 'inputEmail',value: this.inputEmail.getValue()},
                {prop: 'inputWebsite', value: this.inputWebsite.getValue()},
                {prop: 'inputMessage', value: this.inputMessage.value},
                {prop: 'canRelocate', value: this.radioElements[position].value},
                {prop: 'supportingFiles', value : this._files}
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

        _displayErrors : function _displayErrors(errors){
            Object.keys(errors).forEach(function(propertyName) {
                var widget = 'input' + Capitalize(propertyName);
                this[widget].error();
            }, this);
        },

        _triggerFileUpload : function _triggerFileUpload(ev) {
            this.uploadFile.click(ev);
        },

        _updateFilesFeedback : function _updateFilesFeedback(ev) {
            var files = [].slice.call(ev.target.files,0);
            var totalBytes = 0;

            removeClass(this.uploadFilesError, 'active');

            files.forEach(function(file){
                totalBytes += file.size;
            });

            if (this._files.length) {
                this._files.forEach(function(file) {
                    totalBytes += file.size;
                });
            }

            if(totalBytes >= this.constructor.MAX_BYTE_SIZE){
                addClass(this.uploadFilesError, 'active');
                return;
            }


            files.forEach(function(file) {
                this._files.push(file);
            }, this);

            this.attachFilesList.flush().add(this._files);
        },

        destroy : function destroy() {
            this._checkitProps = null;

            Events.off(this.sendButton.element, 'click', this._buttonClickHandlerRef);
            this._buttonClickHandlerRef = null;

            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});

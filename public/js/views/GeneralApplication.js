var CONSTANTS = require('./../lib/const');
var Events = require('./../lib/events');
var onTransitionEnd = require('./../lib/onTransitionEnd');
var generalApplicationData = require ('./../data/general-application/registry');

Class(EM.Overlays, 'generalApplication').inherits(Widget).includes(BubblingSupport)({
    // NAME : 'general-application',
    PATH : '/general-application',
    MENU_COLOR : CONSTANTS.COLORS.purple,
    ELEMENT_CLASS : 'forms -color-bg-white -fix',
    HTML : '\
        <div>\
            <svg class="forms__close -s22r -abs -clickable">\
                <use xlink:href="#svg-close"></use>\
            </svg>\
            <div class="forms__inner"></div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._document = document;
            this.inner = this.element.querySelector('.forms__inner');
            this._setup()._bindEvents();
        },

        setup : function setup() {
            this.showStep(EM.UI.GeneralApplicationStep.NAME);
        },

        _setup : function _setup() {

            this.appendChild(new EM.UI.GeneralApplicationStep({
                name: EM.UI.GeneralApplicationStep.NAME
            })).render(this.inner);

            this.appendChild(new EM.UI.ProjectPlannerStep6({
                name: EM.UI.ProjectPlannerStep6.NAME
            })).render(this.inner);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._keyPressHandlerRef = this._keyPressHandler.bind(this);
            Events.on(this._document, 'keyup', this._keyPressHandlerRef);

            this._closeButtonClickHandlerRef = this._closeButtonClickHandler.bind(this);
            Events.on(this.element.querySelector('.forms__close'), 'click', this._closeButtonClickHandlerRef);

            this._showStepRef = this._showStep.bind(this);
            this.bind('showPage', this._showStepRef);

            this._setDataRef = this._setData.bind(this);
            this.bind('setData', this._setDataRef);

            this.bind('sendForm', this._sendForm);
        },

        _showStep : function _showStep(ev) {
            ev.stopPropagation();

            if (this[ev.name]) {
                this.showStep(ev.name);
            }
        },

        showStep : function showStep(stepName) {
            this.children.forEach(function(child) {
                child.deactivate();
            });

            this[stepName].activate();
        },

        _setData : function _setData(ev){
            ev.stopPropagation();

            ev.data.forEach(function(data){
                generalApplicationData.set(data.prop, data.value);
            });


        },

        _sendForm : function _sendForm (){
            var formData = new FormData();

            var data = generalApplicationData._data;
            for (var property in data){
                if (data.hasOwnProperty(property)){
                    if (data[property] !== 'supportingFiles'){
                        formData.append(property, data[property]);
                    }
                }
            }

            if (data['supportingFiles']){
                $.each($('input[name="upload"]')[0].files, function(i, file){
                    formData.append('file',file);
                });
            }

            $.ajax({
                url : '/sendApplication',
                data : formData,
                processData : false,
                type : 'POST',
                contentType : false,
                success : function(data){
                    generalApplicationData.reset();
                }
            });
        },

        /* Handles the keypress event on document.
         * Basically interested on listening when the `ESC` key is pressed to auto-close this modal.
         * @method _keyPressHandler <private> [Function]
         */
        _keyPressHandler : function _keyPressHandler(ev) {
            if (ev.keyCode === CONSTANTS.KEYCODES.ESC) {
                this.deactivate();
                this.dispatch('generalApplication:closed');
            }
        },

        _closeButtonClickHandler : function _closeButtonClickHandler() {
            this.dispatch('generalApplication:closed');
            this.deactivate();
        },

        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);

            onTransitionEnd(this.element, function() {
                this.destroy();
            }.bind(this));
        },

        destroy : function destroy() {
            Events.off(this._document, 'keyup', this._keyPressHandlerRef);
            this._keyPressHandlerRef = null;

            Events.off(this.element.querySelector('.forms__close'), 'click', this._closeButtonClickHandlerRef);
            this._closeButtonClickHandlerRef = null;

            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});

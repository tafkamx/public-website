var Events = require('./../lib/events');
var CONSTANTS = require('./../lib/const');

Class(EM.UI, 'Overlay').inherits(Widget)({
    ELEMENT_CLASS : 'ui-overlay -abs -color-bg-white',
    HTML : '\
        <div>\
            <svg class="overlay__close -s22r -abs -clickable">\
                <use xlink:href="#svg-close"></use>\
            </svg>\
            <div class="overlay__inner"></div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._document = document;
            this.overlayBody = this.element.querySelector('.overlay__inner');
            this._overlayCloseElement = this.element.querySelector('.overlay__close');
        },

        /* Subscribe to the main events shared across any Subclass of Overlay.
         * @method bindEvents <protected> [Function]
         */
        bindEvents : function bindEvents() {
            this._keyPressHandlerRef = this._keyPressHandler.bind(this);
            Events.on(this._document, 'keyup', this._keyPressHandlerRef);

            this._closeButtonClickHandlerRef = this._closeButtonClickHandler.bind(this);
            Events.on(this._overlayCloseElement, 'click', this._closeButtonClickHandlerRef);
        },

        bindESCKey : function bindESCKey() {
            Events.on(this._document, 'keyup', this._keyPressHandlerRef);
            return this;
        },

        unbindESCKey : function unbindESCKey() {
            Events.off(this._document, 'keyup', this._keyPressHandlerRef);
            return this;
        },

        /* Handles the keypress event on document.
         * Basically interested on listening when the `ESC` key is pressed to auto-close this modal.
         * @method _keyPressHandler <private> [Function]
         */
        _keyPressHandler : function _keyPressHandler(ev) {
            if (ev.keyCode === CONSTANTS.KEYCODES.ESC) {
                this.deactivate();
            }
        },

        _closeButtonClickHandler : function _closeButtonClickHandler() {
            this.deactivate();
        },

        destroy : function destroy() {
            Events.off(this._document, 'keyup', this._keyPressHandlerRef);
            this._keyPressHandlerRef = null;

            Events.off(this._overlayCloseElement, 'click', this._closeButtonClickHandlerRef);
            this._closeButtonClickHandlerRef = null;

            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});

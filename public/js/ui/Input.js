var Events = require('./../lib/events');
var addClass = require('./../lib/utils/class-add');
var removeClass = require('./../lib/utils/class-remove');

Class(EM.UI, 'Input').inherits(Widget)({
    HTML : '<input class="ui-input"/>',

    prototype : {
        data : {
            attr : null
        },

        hasError : false,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            if (this.data.attr) {
                Object.keys(this.data.attr).forEach(function(propertyName) {
                    this.element.setAttribute(propertyName, this.data.attr[propertyName]);
                }, this);
            }
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._clearStateRef = this.clearState.bind(this);
            Events.on(this.element, 'keydown', this._clearStateRef);
        },

        getValue : function getValue() {
            return this.element.value;
        },

        setValue : function setValue(value) {
            this.element.value = value;
            return this;
        },

        clearState : function clearState() {
            this.hasError = false;
            removeClass(this.element, '-is-error -is-success');
            return this;
        },

        /* Sets error state.
         * @method error <public>
         */
        error : function error() {
            this.hasError = true;
            addClass(this.element, '-is-error');
            return this;
        },

        /* Sets success state.
         * @method success <public>
         */
        success : function success() {
            this.hasError = false;
            addClass(this.element, '-is-success');
            return this;
        },

        destroy : function destroy() {
            Events.off(this.element, 'keydown', this._clearStateRef);
            this._clearStateRef = null;

            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});


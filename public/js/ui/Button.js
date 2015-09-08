Class(EM.UI, 'Button').inherits(Widget)({
    ELEMENT_CLASS : 'ui-btn',
    HTML : '<button></button>',

    prototype : {
        text : '',
        html : '',

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            if (this.text) {
                this.element.textContent = this.text;
            }

            if (this.html) {
                this.element.insertAdjacentHTML('beforeend', this.html);
            }
        },

        _disable : function _disable() {
            Widget.prototype._disable.call(this);
            this.element.setAttribute('disabled', true);
        },

        _enable : function _enable() {
            Widget.prototype._enable.call(this);
            this.element.removeAttribute('disabled');
        }
    }
});

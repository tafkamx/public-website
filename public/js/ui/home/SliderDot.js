var Events = require('./../../lib/events');

Class(EM.UI, 'SliderDot').inherits(Widget)({
    HTML : '<div class="em-slider-dot -clickable"></div>',
    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.element, 'click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler() {
            this.dispatch('click');
        },

        destroy : function destroy() {
            Events.off(this.element, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});


/* Menu + Logo
 * @dispatch
 * - click
 * @public
 * - setFillColor (color)
 */
var Events = require('./../lib/events');

Class(EM.UI, 'Menu').inherits(Widget)({
    ELEMENT_CLASS : 'menu -fix -clickable',
    HTML : '\
        <div>\
            <svg class="menu__svg" viewBox="0 0 40 40">\
                <g class="a" transform="translate(11,14)">\
                    <rect x="0" y="0" width="16" height="2"></rect>\
                    <rect x="0" y="5" width="16" height="2"></rect>\
                    <rect x="0" y="10" width="16" height="2"></rect>\
                </g>\
                <g class="b" transform="translate(13,14)">\
                    <rect x="1" y="-1" width="16" height="2" transform="rotate(43,0,0)"></rect>\
                    <rect x="-7" y="8" width="16" height="2" transform="rotate(-43,0,0)"></rect>\
                </g>\
            </svg>\
            <div class="menu__logo -inline-block -font-semi-bold">Empathia</div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.element, 'click', this._clickHandlerRef);
            return this;
        },

        /* Changes the fill color of the menu icons.
         * @method setFillColor <public>
         * @argument color <optional> [String] Any valid color format
         * (hex, rgb, hsl, colorname, etc). If nothing is passed, it will remove
         * the inline `fill` style property letting the base color to take effect.
         * @return Menu
         */
        setFillColor : function setFillColor(color) {
            if (!color) {
                this.element.style.fill = '';
                return this;
            }

            this.element.style.fill = color;
            return this;
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

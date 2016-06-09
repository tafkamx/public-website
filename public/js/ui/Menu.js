/* Menu + Logo
 * @dispatch
 * - click
 * @public
 * - setFillColor (color)
 */
var Events = require('./../lib/events');

Class(EM.UI, 'Menu').inherits(Widget).includes(BubblingSupport)({
    ELEMENT_CLASS : 'menu -abs',
    HTML : '\
        <div>\
            <svg class="menu__svg -clickable -fl" viewBox="0 0 40 40">\
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
            <div class="menu__logo -clickable -inline-block -font-semi-bold">\
            <img src="/img/logo-empathia.png">\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._bindEvents();
        },

        _bindEvents : function _bindEvents() {
            Events.on(this.element.querySelector('.menu__svg'), 'click', this._gridClickHandler.bind(this));
            Events.on(this.element.querySelector('.menu__logo'), 'click', this._logoClickHandler.bind(this));
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
            // always white
            this.element.style.fill = 'white';
        },

        _gridClickHandler : function _gridClickHandler() {
            this.dispatch('toggleGrid');
        },

        _logoClickHandler : function _logoClickHandler() {
            this.dispatch('updateRoute', {
                route : '/'
            });
        }
    }
});

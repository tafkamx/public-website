/* globals EM */
var Events = require('./../lib/events');

Class(EM.UI, 'BottomPageLinkItem').inherits(Widget).includes(BubblingSupport)({
    ELEMENT_CLASS : 'page__bottom-links-item -rel',
    HTML : '\
        <a href="/">\
            <div class="page__bottom-links-bg -abs -img-cover -abs-after -full-width -full-height"></div>\
            <div class="page__bottom-links-gradient -abs -full-width -full-height -abs-before"></div>\
            <div class="page__bottom-links-item-info -rel">\
                <p class="page__bottom-links-item-subtitle -font-light -ttu -ellipsis"></p>\
                <h2 class="page__bottom-links-item-title -m0 -font-bold -ellipsis"></h2>\
            </div>\
        </a>',
    prototype : {
        view : null,
        col : 12,
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.element.classList.add('-col-' + this.col);
            this.element.setAttribute('href', this.view.PATH);
            this.element.querySelector('.page__bottom-links-bg').style.backgroundImage = 'url(' + this.view.BG + ')';
            this.element.querySelector('.page__bottom-links-gradient').classList.add(this.view.GRADIENT);
            this.element.querySelector('.page__bottom-links-item-subtitle').textContent = this.view.SUBTITLE;
            this.element.querySelector('.page__bottom-links-item-title').textContent = this.view.TITLE;
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.element, 'click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler(ev) {
            ev.preventDefault();
            this.dispatch('updateRoute', {
                route: this.view.PATH
            });
        },

        destroy : function destroy() {
            Events.off(this.element, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});

/* globals EM */
var Events = require('./../lib/events');

Class(EM.UI, 'GridItem').inherits(Widget)({
    ELEMENT_CLASS : 'grid__item -inline-block -clickable',
    HTML : '\
        <div>\
            <div class="grid__item-cover -abs-before">\
                <div class="grid__item-cover-img -full-height -img-cover"></div>\
            </div>\
            <div class="grid__item-title-wrapper -tal">\
                <p class="grid__item-index -font-extra-light">{index}</p>\
                <p class="grid__item-title -font-semi-bold -ellipsis">{title}</p>\
            </div>\
        </div>',

    prototype : {
        view : null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.name = this.view.NAME;
            this.imageElement = this.element.querySelector('.grid__item-cover-img');
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.element.querySelector('.grid__item-index').textContent = this.index;
            this.element.querySelector('.grid__item-title').textContent = this.title;
            this.imageElement.style.backgroundImage = 'url(' + this.view.BG + ')';
            this.element.querySelector('.grid__item-cover').classList.add(this.view.GRADIENT);
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.element, 'click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler(ev) {
            ev.preventDefault();
            this.constructor.dispatch('itemClicked', {instance: this});
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            Events.off(this.element, 'click');
            return null;
        }
    }
});


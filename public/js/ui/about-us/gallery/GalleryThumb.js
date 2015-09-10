var Events = require('./../../../lib/events');

Class(EM.UI, 'GalleryThumb').inherits(Widget).includes(BubblingSupport)({
    ELEMENT_CLASS : 'about-us__team-gallery-thumb -clickable',
    HTML : '<img width="144" height="144"/>',
    IMAGE_BASE_PATH : '/img/views/about-us/the-team/thumbnails/',
    prototype : {
        item : null,
        index : 0,
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.element.setAttribute('src', EM.UI.GalleryThumb.IMAGE_BASE_PATH + this.item.thumb);
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.element, 'click', this._clickHandlerRef);
        },

        getRects : function getRects() {
            return this.element.getBoundingClientRect();
        },

        _clickHandler : function _clickHandler() {
            this.dispatch('thumb:clicked', {index: this.index});
        }
    }
});

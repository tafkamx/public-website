var Events = require('./../../../lib/events');

Class(EM.UI, 'GalleryThumb').inherits(Widget).includes(BubblingSupport)({
    ELEMENT_CLASS : 'about-us__team-gallery-thumb -clickable',
    HTML : '<img width="144" height="144"/>',
    IMAGE_BASE_PATH : '/img/views/about-us/the-team/thumbnails/',
    prototype : {
        item : null,
        index : 0,

        _offsetLeft : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.element.setAttribute('src', EM.UI.GalleryThumb.IMAGE_BASE_PATH + this.item.thumb);
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.element, 'click', this._clickHandlerRef);
        },

        getOffsetLeft : function getOffsetLeft() {
            var left = this._offsetLeft;
            if (!this._offsetLeft) {
                left = this.element.offsetLeft;
            }
            return left;
        },

        reset : function reset() {
            this._offsetLeft = null;
        },

        _clickHandler : function _clickHandler() {
            this.dispatch('thumb:clicked', {index: this.index});
        }
    }
});

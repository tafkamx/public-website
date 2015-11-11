var inlineStyle = require('./../../../lib/inline-style');
var Events = require('./../../../lib/events');

Class(EM.UI, 'GalleryThumbs').inherits(Widget).includes(BubblingSupport)({
    ELEMENT_CLASS : 'about-us__team-gallery-thumbs-wrapper page__container',
    HTML : '\
        <div>\
            <div class="about-us__team-gallery-thumbs -rel">\
                <div class="about-us__team-gallery-thumb-active-indicator">\
                    <svg viewBox="0 0 100 100">\
                        <rect x="0" y="0" width="100%" height="100%" stroke-width="2" stroke="url(#gradient-4b)" vector-effect="non-scaling-stroke" fill="transparent"></rect>\
                    </svg>\
                </div>\
            </div>\
        </div>',

    prototype : {
        /* options */
        items : null,

        _currentActive : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.wrapper = this.element.querySelector('.about-us__team-gallery-thumbs');
            this.indicator = this.element.querySelector('.about-us__team-gallery-thumb-active-indicator');
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.items.forEach(function(item, index) {
                this.appendChild(new EM.UI.GalleryThumb({
                    name : 'thumb_' + index,
                    item : item,
                    index : index
                })).render(this.wrapper);
            }, this);
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._resizeHandlerRef = this._resizeHandler.bind(this);
            Events.on(window, 'resize', this._resizeHandlerRef);
        },

        /* Activate a thumb by index.
         * @method select <public>
         */
        select : function select(index) {
            this._currentActive = this.children[index];
            this._updateIndicatorPosition();
            return this;
        },

        /* Deactivate all thumbs.
         * @method deselectAll <public>
         */
        deselectAll : function deselectAll() {
            this.children.forEach(function(child) {
                child.deactivate();
            });
            return this;
        },

        _resizeHandler : function _resizeHandler() {
            this.children.forEach(function(child) {
                child.reset();
            });
            this._updateIndicatorPosition();
        },

        _updateIndicatorPosition : function _updateIndicatorPosition() {
            if (!this._currentActive) {
                return;
            }

            var left = ~~this._currentActive.getOffsetLeft();
            if (left === 0){ left = 88; } // Temporal offset adjusment when one member is missing. 

            inlineStyle(this.indicator, {
                msTransform: 'translateX(' + left + 'px)',
                webkitTransform: 'translateX(' + left + 'px)',
                transform: 'translateX(' + left + 'px)'
            });
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            Events.off(window, 'resize', this._resizeHandlerRef);
            this._resizeHandlerRef = null;
            return null;
        }
    }
});

var Events = require('./../../../lib/events');

Class(EM.UI, 'GalleryThumbs').inherits(Widget).includes(BubblingSupport)({
    ELEMENT_CLASS : 'about-us__team-gallery-thumbs-wrapper',
    HTML : '\
        <div>\
            <div class="about-us__team-gallery-thumbs -rel">\
                <div class="about-us__team-gallery-thumb-active-indicator">\
                    <svg viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">\
                        <rect x="0" y="0" width="100%" height="100%" stroke="url(#gradient-4b)" fill="transparent"></rect>\
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
            this._updateIndicatorPositionRef = this._updateIndicatorPosition.bind(this);
            Events.on(window, 'resize', this._updateIndicatorPositionRef);
        },

        /* Activate a thumb by index.
         * @method select <public>
         */
        select : function select(index) {
            // this.deselectAll();
            this._currentActive = this.children[index];//.activate();
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

        _updateIndicatorPosition : function _updateIndicatorPosition() {
            if (!this._currentActive) {
                return;
            }

            var rects = this._currentActive.getRects();
            var left = ~~rects.left;
            this.indicator.style.msTransform = 'translateX(' + left + 'px)';
            this.indicator.style.webkitTransform = 'translateX(' + left + 'px)';
            this.indicator.style.transform = 'translateX(' + left + 'px)';
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            Events.off(window, 'resize', this._updateIndicatorPositionRef);
            this._updateIndicatorPositionRef = null;
            return null;
        }
    }
});

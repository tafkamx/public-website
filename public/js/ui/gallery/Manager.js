/* globals EM */
Class(EM, 'GalleryManager').inherits(Widget)({
    prototype : {
        container : null,
        data : null,
        init : function init(config) {
            Object.keys(config || {}).forEach(function (propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new EM.GalleryItems({
                name : 'items',
                items : this.data
            })).render(this.container);

            this.appendChild(new EM.GalleryThumbs({
                name : 'thumbs',
                items : this.data
            })).render(this.container);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._thumbClickHandlerRef = this._thumbClickHandler.bind(this);
            this.bind('thumb:clicked', this._thumbClickHandlerRef);
        },

        _thumbClickHandler : function _thumbClickHandler(ev) {
            this.selectByIndex(ev.index);
        },

        selectByIndex : function selectByIndex(index) {
            this.items.select(index);
            this.thumbs.select(index);
            return this;
        }
    }
});

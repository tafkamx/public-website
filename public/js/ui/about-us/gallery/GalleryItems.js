Class(EM.UI, 'GalleryItems').inherits(Widget)({
    ELEMENT_CLASS : '-full-height about-us__team-gallery-details -rel page__container',
    prototype : {
        items : null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.items.forEach(function(item, index) {
                this.appendChild(new EM.UI.GalleryItem({
                    name : 'item_' + index,
                    item : item
                })).render(this.element);
            }, this);
        },

        select : function select(index) {
            this.deselectAll();
            this.children[index].activate();
            return this;
        },

        deselectAll : function deselectAll() {
            this.children.forEach(function(child) {
                child.deactivate();
            });
            return this;
        }
    }
});

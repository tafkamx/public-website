var GeminiScrollbar = require('gemini-scrollbar');

Class(EM, 'PagesManager').inherits(Widget).includes(BubblingSupport)({
    HTML : '\
        <div class="pages">\
            <div class="gm-scrollbar -vertical"><span class="thumb"></span></div>\
            <div class="gm-scrollbar -horizontal"><span class="thumb"></span></div>\
            <div class="gm-scroll-view"></div>\
        </div>',

    prototype : {
        _current : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.scrollbar = new GeminiScrollbar({
                element : this.element,
                createElements : false,
                autoshow : true
            }).create();
        },

        renderView : function renderView(view) {
            if (this.parent.grid[view.name]) {
                this.parent.cover.setCoords(this.parent.grid[view.name].imageElement);
                this.parent.cover.setImage(view.constructor);
            }

            if (this.getCurrent()) {
                this.getCurrent().destroy();
            }

            this.setCurrent(view);
            this.scrollbar.update();
            view.render(this.scrollbar.getViewElement()).setup();
            this.scrollbar.update();
            return this;
        },

        setCurrent : function setCurrent(view) {
            this._current = view;
            return this;
        },

        getCurrent : function getCurrent() {
            return this._current;
        }
    }
});

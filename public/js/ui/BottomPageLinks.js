/* globals EM */
Class(EM.UI, 'BottomPageLinks').inherits(Widget).includes(BubblingSupport)({
    ELEMENT_CLASS : 'page__bottom-links -row -tac',
    prototype : {
        views : null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            if (this.views instanceof Array) {
                var col = (12 / this.views.length);

                this.views.forEach(function(view) {
                    this.appendChild(new EM.UI.BottomPageLinkItem({
                        name : view.NAME,
                        view : view,
                        col : col
                    })).render(this.element);
                }, this);
            }
        }
    }
});

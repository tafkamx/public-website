var addClass = require('./../lib/utils/class-add');

Class(EM.UI, 'PageLoader').inherits(Widget)({
    ELEMENT_CLASS : 'page__loader -color-bg-neutral-xx-light',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        },

        gone : function gone() {
            addClass(this.element, 'gone');
            return this;
        }
    }
});

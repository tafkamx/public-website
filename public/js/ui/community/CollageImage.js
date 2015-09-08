var addClass = require('./../../lib/utils/class-add');

Class(EM.UI, 'CollageImage').inherits(EM.UI.Collage)({
    HTML : '<article></article>',
    ELEMENT_CLASS : 'collage__item image -col-3 -rel',

    prototype : {
        init : function init(config) {
            EM.UI.Collage.prototype.init.call(this, config);

            this.element.style.backgroundImage = 'url(' + this.data.image + ')';
            addClass(this.element, '-img-cover');
        }
    }
});

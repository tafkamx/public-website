var addClass = require('./../../lib/utils/class-add');

Class(EM.UI, 'CollageQuote').inherits(EM.UI.Collage)({
    HTML : '\
        <article class="collage__item quote -col-3 -rel">\
            <div class="collage__item-inner -abs">\
                <div class="-table -full-height -full-width -tac">\
                    <div data-text class="collage-quote-text -table-cell -vam -font-light"></div>\
                </div>\
            </div>\
        </article>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.element.querySelector('[data-text]').textContent = this.data.text;
            if (this.data.gradient) {
                addClass(this.element, '-abs-before ' + this.data.gradient);
            }
        }
    }
});

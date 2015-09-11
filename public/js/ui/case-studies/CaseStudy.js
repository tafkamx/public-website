var inlineStyle = require('./../../lib/inline-style');

Class(EM.UI, 'CaseStudy').inherits(Widget)({
    HTML : '\
        <article class="case-studies__proyect -tac -rel">\
            <div class="case-studies__proyect-bg -img-cover -abs -abs-after"></div>\
            <div class="case-studies__proyect-info -tac -rel">\
                <h2 class="case-studies__proyect-title -font-bold">{title}</h2>\
                <p class="case-studies__proyect-desc -font-light">{description}</p>\
            </div>\
        </article>',

    prototype : {
        data : {
            title : null,
            description : null,
            bgImage: null,
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup();
        },

        _setup : function _setup() {
            this.element.querySelector('.case-studies__proyect-title').textContent = this.data.title;
            this.element.querySelector('.case-studies__proyect-desc').textContent = this.data.description;
            inlineStyle(this.element.querySelector('.case-studies__proyect-bg'), {
                backgroundImage : 'url(' + this.data.bgImage + ')'
            });
            return this;
        }
    }
});

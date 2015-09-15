var inlineStyle = require('./../../lib/inline-style');

Class(EM.UI, 'CaseStudy').inherits(Widget)({
    HTML : '\
        <a class="case-studies__proyect -block -tac -rel -clickable" target="_blank">\
            <div class="case-studies__proyect-bg -img-cover -abs -abs-after"></div>\
            <div class="case-studies__proyect-info -tac -rel">\
                <h2 class="case-studies__proyect-title -font-bold">{title}</h2>\
                <p class="case-studies__proyect-desc -font-light">{description}</p>\
            </div>\
        </a>',

    prototype : {
        data : {
            title : null,
            description : null,
            bgImage: null,
            url : null
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup();
        },

        _setup : function _setup() {
            this.element.setAttribute('href', this.data.url);
            this.element.setAttribute('title', 'View ' + this.data.title);
            this.element.querySelector('.case-studies__proyect-title').textContent = this.data.title;
            this.element.querySelector('.case-studies__proyect-desc').textContent = this.data.description;
            inlineStyle(this.element.querySelector('.case-studies__proyect-bg'), {
                backgroundImage : 'url(' + this.data.bgImage + ')'
            });
            return this;
        }
    }
});

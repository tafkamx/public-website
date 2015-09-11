var Events = require('./../../lib/events');
var addClass = require('./../../lib/utils/class-add');

Class(EM.UI, 'SlideItem').inherits(Widget).includes(BubblingSupport)({
    HTML : '\
        <div class="em-slide -abs -full-height -full-width -abs-before">\
            <div class="em-slide__bg -img-cover -abs -full-height -full-width"></div>\
            <div class="em-slide__text">\
                <p class="em-slide__subheading"></p>\
                <h1 class="em-slide__heading -font-bold"></h1>\
            </div>\
        </div>',
    CTA_HTML : '<a href="{link}" class="ui-btn -md -pl3 -pr3 -mt2 -white">{text}</a>',

    prototype : {
        data : {
            gradient : null,
            bg : {
                image : null,
                className : null
            },
            title : {
                text : null,
                className : null
            },
            message : null,
            cta : {
                label : null,
                link : null,
                external : false
            }
        },
        index : 0,
        zindex: 0,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.slideBgElement = this.element.querySelector('.em-slide__bg');
            this.titleElement = this.element.querySelector('.em-slide__subheading');
            this.messageElement = this.element.querySelector('.em-slide__heading');
            this.ctaElement = null;
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.element.style.zIndex = this.zindex;
            this.element.classList.add(this.data.gradient);

            this.slideBgElement.style.backgroundImage = 'url(' + this.data.bg.image + ')';
            this.titleElement.insertAdjacentHTML('afterbegin', this.data.title.text);
            this.messageElement.insertAdjacentHTML('afterbegin', this.data.message.text);

            if (this.data.className) {
                addClass(this.element, this.data.className);
            }

            if (this.data.bg.className) {
                addClass(this.slideBgElement, this.data.bg.className);
            }

            if (this.data.title.className) {
                addClass(this.titleElement, this.data.title.className);
            }

            if (this.data.cta) {
                var cta = this.constructor.CTA_HTML;
                cta = cta.replace(/{text}/, this.data.cta.text);
                cta = cta.replace(/{link}/, this.data.cta.link);

                this.element.querySelector('.em-slide__text').insertAdjacentHTML('beforeend', cta);
                this.ctaElement = this.element.querySelector('.ui-btn');
            }

            return this;
        },

        _bindEvents : function _bindEvents() {
            if (this.ctaElement) {
                if (this.data.cta.external) {
                    this.ctaElement.setAttribute('target', '_blank');
                } else {
                    this._ctaClickHandlerRef = this._ctaClickHandler.bind(this);
                    Events.on(this.ctaElement, 'click', this._ctaClickHandlerRef);
                }
            }
        },

        old : function old() {
            this.element.classList.add('old');
            return this;
        },

        _ctaClickHandler : function _ctaClickHandler(ev) {
            ev.preventDefault();
            this.dispatch('updateRoute', {
                route: ev.currentTarget.getAttribute('href')
            });
        },

        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);
            this.element.classList.remove('old');
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            if (this.ctaElement) {
                if (!this.data.cta.external) {
                    Events.off(this.ctaElement, 'click', this._ctaClickHandlerRef);
                    this._ctaClickHandlerRef = null;
                }
            }
            return null;
        }
    }
});

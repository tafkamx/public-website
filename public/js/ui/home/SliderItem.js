var Events = require('./../../lib/events');
var hasTouchSupport = require('./../../lib/utils/hasTouchSupport');
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
    P_HTML: '<p>{text}</p>',
    UL_HTML: '<h2 class="-featured">Featured work</h2><ul>{items}</ul>',
    UL_LI_HTML: '<li><h5>{title}</h5><h3>{desc}</h3><a href="{url}">view case study</a></li>',

    CTA_HTML : '<button data-link="{link}" class="ui-btn -md -pl3 -pr3 -mt2 -white -clickable"><span class="-rel">{text}</span></button>',
    CTA_EXTERNAL_HTML : '<a href="{link}" class="ui-btn -md -pl3 -pr3 -mt2 -white -clickable" target="_blank"><span class="-rel">{text}</span></a>',

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

            if (this.data.gradient) {
              this.element.classList.add(this.data.gradient);
            }

            this.data.bg = this.data.bg || {};

            if (this.data.bg.image) {
              this.slideBgElement.style.backgroundImage = 'url(' + this.data.bg.image + ')';
            }

            this.titleElement.insertAdjacentHTML('afterbegin', this.data.title.text);
            this.messageElement.insertAdjacentHTML('afterbegin', this.data.message.text);

            if (this.data.LIGHTER) {
              this.messageElement.classList.remove('-font-bold');
            }

            if (this.data.className) {
                addClass(this.element, this.data.className);
            }

            if (this.data.bg.className) {
                addClass(this.slideBgElement, this.data.bg.className);
            }

            if (this.data.title.className) {
                addClass(this.titleElement, this.data.title.className);
            }

            if (this.data.p) {
              var p = this.constructor.P_HTML;

              p = p.replace(/{text}/, this.data.p.text);

              this.element.querySelector('.em-slide__text').insertAdjacentHTML('beforeend', p);
            }

            if (this.data.featured) {
              var markup = this.constructor.UL_LI_HTML;
              var items = this.data.featured.map(function(item) {
                return markup
                  .replace(/{title}/, item.title)
                  .replace(/{desc}/, item.desc)
                  .replace(/{url}/, item.url);
              });

              var list = this.constructor.UL_HTML.replace(/{items}/, items.join(''));

              this.element.querySelector('.em-slide__text').insertAdjacentHTML('beforeend', list);
            }

            if (this.data.cta) {
                var cta;

                if (this.data.cta.external) {
                    cta = this.constructor.CTA_EXTERNAL_HTML;
                } else {
                    cta = this.constructor.CTA_HTML;
                }

                cta = cta.replace(/{text}/, this.data.cta.text);
                cta = cta.replace(/{link}/, this.data.cta.link);


                if (this.data.cta.dark) {
                  cta = cta.replace(/ -white/, '');
                }

                this.element.querySelector('.em-slide__text').insertAdjacentHTML('beforeend', cta);
                this.ctaElement = this.element.querySelector('.ui-btn');
            }

            return this;
        },

        _bindEvents : function _bindEvents() {
            if (this.ctaElement) {
                this._ctaClickHandlerRef = this._ctaClickHandler.bind(this);

                if (hasTouchSupport) {
                    Events.on(this.ctaElement, 'touchstart', this._ctaClickHandlerRef);
                } else {
                    Events.on(this.ctaElement, 'click', this._ctaClickHandlerRef);
                }
            }
        },

        old : function old() {
            this.element.classList.add('old');
            return this;
        },

        _ctaClickHandler : function _ctaClickHandler(ev) {
            ev.stopPropagation();

            if (this.data.cta.external) {
                ev.preventDefault();
                window.location = this.data.cta.link;
                return;
            }

            this.dispatch('updateRoute', {
                route: ev.currentTarget.getAttribute('data-link')
            });
        },

        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);
            this.element.classList.remove('old');
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            if (this.ctaElement) {
                if (hasTouchSupport) {
                    Events.off(this.ctaElement, 'touchstart', this._ctaClickHandlerRef);
                } else {
                    Events.off(this.ctaElement, 'click', this._ctaClickHandlerRef);
                }
                this._ctaClickHandlerRef = null;
            }
            return null;
        }
    }
});

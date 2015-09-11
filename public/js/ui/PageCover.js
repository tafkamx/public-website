var addClass = require('./../lib/utils/class-add');

Class(EM.UI, 'PageCover').inherits(Widget)({
    HTML : '\
        <header class="page__header -abs-before">\
            <div class="page__header-bg -img-cover -matisse"></div>\
            <div class="page__header-intro">\
                <p class="page__header-subheading -font-light -ttu"></p>\
                <h1 class="page__header-heading -font-bold"></h1>\
                <div class="page__header-help">\
                    <svg class="page__header-help-svg -s22r -color-white"><use xlink:href="#svg-scroll-mouse"></use></svg>\
                    <p class="page__header-help-text -inline-block">Scroll down to show you how we do it.</p>\
                </div>\
            </div>\
        </header>',

    prototype : {
        data : {
            subheading : '',
            heading : '',
            background : '',
            backgroundClassName : '',
            scrollInfo : ''
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.coverElement = this.element.querySelector('.page__header-bg');
            this.subheadingElement = this.element.querySelector('.page__header-subheading');
            this.headingElement = this.element.querySelector('.page__header-heading');
            this.helpElement = this.element.querySelector('.page__header-help');

            this.coverElement.style.backgroundImage = 'url(' + this.data.background + ')';
            this.element.classList.add(this.data.backgroundClassName);
            this.subheadingElement.insertAdjacentHTML('beforeend', this.data.subheading);
            this.headingElement.insertAdjacentHTML('beforeend', this.data.heading);

            if (this.data.scrollInfo) {
                this.element.querySelector('.page__header-help-text').textContent = this.data.scrollInfo;
            }
        },

        _activate : function _activate() {
            Widget.prototype._activate.call(this);
            requestAnimationFrame(function() {
                addClass(this.subheadingElement, 'active');
                addClass(this.headingElement, 'active');
                addClass(this.helpElement, 'active');
            }.bind(this));
        }
    }
});

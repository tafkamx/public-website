/* globals EM */
Class(EM, 'GalleryItem').inherits(Widget)({
    ELEMENT_CLASS : 'about-us__gallery-item -col-12 -full-height',
    HTML : '\
        <div class="about-us__gallery-item">\
            <div class="about-us__team-gallery-photo -rel -full-height -col-6 -tac">\
                <img class="about-us__team-gallery-photo-img -full-height"/>\
            </div>\
            <div class="about-us__team-gallery-info -col-6 -pl2 -rel">\
                <p class="about-us__team-gallery-info-name -font-medium"></p>\
                <p class="about-us__team-gallery-info-title -mb1"></p>\
                <div data-networks class="-mb1"></div>\
                <p class="about-us__team-gallery-info-desc -font-light -mb1"></p>\
            </div>\
        </div>',

    NETWORK_ITEM_HTML : '\
        <div class="about-us__team-gallery-network -inline-block -mr1">\
            <a href="{url}" class="-block" target="_blank">\
                <svg class="-s24r"><use xlink:href="#svg-{type}-icon"></use></svg>\
            </a>\
        </div>',

    QUOTE_HTML : '\
        <blockquote class="about-us__team-gallery-quote -font-light">\
            <p>{quote}</p>\
            <footer>— <cite>{author}</cite></footer>\
        </blockquote>',

    IMAGE_BASE_PATH : '/img/views/about-us/the-team/',

    prototype : {
        item : null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.imageElement = this.element.querySelector('.about-us__team-gallery-photo-img');
            this.nameElement = this.element.querySelector('.about-us__team-gallery-info-name');
            this.titleElement = this.element.querySelector('.about-us__team-gallery-info-title');
            this.descElement = this.element.querySelector('.about-us__team-gallery-info-desc');
            this._setup();
        },

        _setup : function _setup() {
            this.imageElement.setAttribute('src', EM.GalleryItem.IMAGE_BASE_PATH + this.item.image);
            this.nameElement.textContent = this.item.name;
            this.titleElement.textContent = this.item.title;
            this.descElement.textContent = this.item.bio;

            if (this.item.networks && this.item.networks.length) {
                this._addNetworks(this.item.networks);
            }

            if (this.item.quote) {
                this._addQuote(this.item.quote);
            }
        },

        _addNetworks : function _addNetworks(networks) {
            var networksWrapper = this.element.querySelector('[data-networks]');
            networks.forEach(function(network) {
                var htmlString = this.constructor.NETWORK_ITEM_HTML;
                htmlString = htmlString.replace(/{url}/, network.url);
                htmlString = htmlString.replace(/{type}/, network.type);
                networksWrapper.insertAdjacentHTML('beforeend', htmlString);
            }, this);
            return this;
        },

        _addQuote : function _addQuote(quote) {
            var htmlString = this.constructor.QUOTE_HTML;
            htmlString = htmlString.replace(/{quote}/, quote.text);
            htmlString = htmlString.replace(/{author}/, quote.author);
            this.element.querySelector('.about-us__team-gallery-info').insertAdjacentHTML('beforeend', htmlString);
            return this;
        }
    }
});

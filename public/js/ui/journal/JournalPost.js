Class(EM.UI, 'JournalPost').inherits(Widget)({
    HTML : '\
        <article>\
            <a class="journal__post-item" target="_blank">\
                <h2 class="journal__post-title -font-light"></h2>\
                <div class="journal__post-meta -font-light -color-neutral-light">by <span data-author-name></span> in <span data-category class="-color-pink"></span></div>\
            </a>\
        </article>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.element.querySelector('.journal__post-item').setAttribute('href', this.data.url);
            this.element.querySelector('.journal__post-title').textContent = this.data.title;
            this.element.querySelector('[data-author-name]').textContent = this.data.by;
            this.element.querySelector('[data-category]').textContent = this.data.category;
        }
    }
});

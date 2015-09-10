Class(EM.UI, 'WeAreAll').inherits(Widget)({
    ELEMENT_CLASS : 'we-are-all-widget -fix -pen',
    HTML : '\
        <div>\
            <div class="-table -full-width -full-height">\
                <div class="-table-cell -vam">\
                    <div class="waa__main-text -font-light">We’re all</div>\
                    <div class="waa__keywords -rel -font-bold">\
                        <div data-name="designers" class="waa__keyword">designers.</div>\
                        <div data-name="friends" class="waa__keyword">friends.</div>\
                        <div data-name="driven" class="waa__keyword">purpose driven.</div>\
                        <div data-name="best" class="waa__keyword">among the best.</div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ',

    prototype : {
        /* Base Element reference to positioning the circle.
         * @property referenceElement <required> [HTMLElement]
         */
        referenceElement : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.keywords = [].slice.call(this.element.querySelectorAll('.waa__keyword'), 0);
        },

        /* Centers the widget vertically and aligns it horizontally constrained
         * to the passed `referenceElement` config option.
         * @method center <public>
         * @returns WeAreAll
         */
        center : function center() {
            var rects = this.referenceElement.getBoundingClientRect();
            var left = ~~rects.left - 20;
            var width = ~~rects.width;
            var height = width;

            this.element.style.width = width + 'px';
            this.element.style.height = height + 'px';
            this.element.style.webkitTransform = 'translate(' + left + 'px, -50%)';
            this.element.style.transform = 'translate(' + left + 'px, -50%)';

            return this;
        },

        showKeyword : function showKeyword(name) {
            this.keywords.forEach(function(keyword) {
                keyword.classList.remove('active');
                if (keyword.dataset.name === name) {
                    keyword.classList.add('active');
                }
            });
        }
    }
});

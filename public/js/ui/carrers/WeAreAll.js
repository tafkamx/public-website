var CharacterShuffling = require('character-shuffling');

Class(EM.UI, 'WeAreAll').inherits(Widget)({
    ELEMENT_CLASS : 'we-are-all-widget -fix',
    HTML : '\
        <div>\
            <div class="-table -full-width -full-height">\
                <div class="-table-cell -vam">\
                    <div class="waa__main-text -font-light">We’re all</div>\
                    <div class="waa__keywords -rel -font-bold">\
                        <div class="waa__keyword active">designers.</div>\
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

            this.shuffler = new CharacterShuffling(this.element.querySelector('.waa__keyword'));
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
            if (this.shuffler.get('text') !== name) {
                this.shuffler.shuffle({
                    text : name
                });
            }
        },

        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);
            this.shuffler.set('text', '');
        }
    }
});

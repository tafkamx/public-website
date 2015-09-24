var inlineStyle = require('./../../lib/inline-style');
var CharacterShuffling = require('character-shuffling');

Class(EM.UI, 'WeAreAll').inherits(Widget)({
    ELEMENT_CLASS : 'we-are-all-widget -abs',
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

        _availableHeight: 0,

        _state: {
            nor: false,
            fix: false,
            abs: false
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.shuffler = new CharacterShuffling(this.element.querySelector('.waa__keyword'), {
                chars : "abcdefghijklmnopqrstuvwxyz"
            });
        },

        /* Centers the widget vertically and aligns it horizontally constrained
         * to the passed `referenceElement` config option.
         * @method center <public>
         * @returns WeAreAll
         */
        center : function center(availableHeight) {
            var rects = this.referenceElement.getBoundingClientRect();
            var left = ~~(rects.left - 20);
            var width = ~~(rects.width - 40);
            var height = width;

            this._availableHeight = availableHeight;

            inlineStyle(this.element, {
                width: width + 'px',
                height: height + 'px',
                left: left + 'px',
                top: (availableHeight - height) / 2 + 'px',
                zIndex: -1
            });

            return this;
        },

        /* Sets the widget in absolute position relative to the top (original state)
         * @method nor <public> [Function]
         * @return undefined
         */
        nor : function nor() {
            if (this._state.nor) {return;}

            this._state.nor = true;
            this._state.fix = false;
            this._state.abs = false;

            inlineStyle(this.element, {
                position: 'absolute',
                top: (this._availableHeight - this.element.offsetHeight) / 2 + 'px',
                left: 'initial',
                bottom: 'initial'
            });
        },

        /* Sets the widget to fixed position.
         * @method fix <public> [Function]
         * @return undefined
         */
        fix : function fix() {
            if (this._state.fix) {return;}

            this._state.fix = true;
            this._state.nor = false;
            this._state.abs = false;

            var rects = this.element.getBoundingClientRect();

            inlineStyle(this.element, {
                position: 'fixed',
                top: rects.top + 'px',
                left: rects.left + 'px'
            });
        },

        /* Sets the widget in absolute position relative to the bottom.
         * @method abs <public> [Function]
         * @return undefined
         */
        abs : function abs() {
            if (this._state.abs) {return;}

            this._state.abs = true;
            this._state.nor = false;
            this._state.fix = false;

            inlineStyle(this.element, {
                position: 'absolute',
                top: 'initial',
                left: 'initial',
                bottom: (this._availableHeight - this.element.offsetHeight) / 2 + 'px'
            });
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

var inlineStyle = require('./../../lib/inline-style');

Class(EM.UI, 'ImageStrip').inherits(Widget)({
    ELEMENT_CLASS : 'careers__image-strip-wrapper',
    HTML : '\
        <div>\
            <article class="careers__image-strip -row">\
                <div class="image-strip" data-imagestrip></div>\
                <div class="image-strip" data-imagestrip></div>\
                <div class="image-strip" data-imagestrip></div>\
                <div class="image-strip" data-imagestrip></div>\
                <div class="image-strip" data-imagestrip></div>\
            </article>\
        </div>',

    prototype : {
        _clientHeight: 0,
        _height: 0,

        _state: {
            nor: false,
            fix: false,
            abs: false
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._body = document.body;
            this.imagesContainer = this.element.querySelector('.careers__image-strip');
            this.imageContainerClone = this.element.cloneNode(true);

            inlineStyle(this.imageContainerClone, {
                position: 'relative',
                zIndex: 1,
                opacity: 0,
                boxShadow: 'white 0px 20px 20px',
                pointerEvents: 'none'
            });

            this._body.appendChild(this.imageContainerClone);
        },

        updateHeight : function updateHeight() {
            this.nor();
            this.element.style.height = '';

            this._clientHeight = window.innerHeight;
            this._height = this.element.offsetHeight;

            this.element.style.height = this._height + 'px';
            return this;
        },

        getRemainingHeight : function getRemainingHeight() {
            return this._clientHeight - this._height;
        },

        /* Sets the image stripe back to its original position.
         * @method nor <public> [Function]
         * @return undefined
         */
        nor : function nor() {
            if (this._state.nor) {return;}

            this._state.nor = true;
            this._state.fix = false;
            this._state.abs = false;

            this.imagesContainer.setAttribute('style', '');

            inlineStyle(this.element, {
                opacity: 1
            });

            inlineStyle(this.imageContainerClone, {
                opacity: 0
            });
        },

        /* Sets the image stripe to fixed position.
         * @method fix <public> [Function]
         * @return undefined
         */
        fix : function fix() {
            if (this._state.fix) {return;}

            this._state.fix = true;
            this._state.nor = false;
            this._state.abs = false;

            inlineStyle(this.element, {
                opacity: 0
            });

            inlineStyle(this.imageContainerClone, {
                opacity: 1
            });
        },

        /* Sets the image stripe back to absolute position.
         * @method abs <public> [Function]
         * @return undefined
         */
        abs : function abs() {
            if (this._state.abs) {return;}

            this._state.abs = true;
            this._state.nor = false;
            this._state.fix = false;

            inlineStyle(this.element, {
                opacity: 1
            });

            inlineStyle(this.imagesContainer, {
                position: 'absolute',
                top: 'initial',
                bottom: (this._clientHeight - this._height) + 'px',
                width: '100%',
                zIndex: 'initial'
            });

            inlineStyle(this.imageContainerClone, {
                opacity: 0
            });
        }
    }
});

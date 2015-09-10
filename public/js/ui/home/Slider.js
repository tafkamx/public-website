var onTransitionEnd = require('./../../lib/onTransitionEnd');

Class(EM.UI, 'Slider').inherits(Widget)({
    HTML : '\
        <div class="em-slider -vh">\
            <div class="em-slides -vh"></div>\
            <div class="em-slider-dots -abs"></div>\
        </div>',

    prototype : {
        _index : null,
        _slides : null,
        _totalSlides : 0,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._slides = [];
            this.slidesWrapper = this.element.querySelector('.em-slides');
            this.dotsWrapper = this.element.querySelector('.em-slider-dots');

            this._dotClickHandlerRef = this._dotClickHandler.bind(this);
            this._transitionEndRef = this._transitionEnd.bind(this);
        },

        /* Register a new SliderItem, appends and renders the new slide,
         * it also register a new SliderDot.
         * @method addSlide <public>
         */
        addSlide : function addSlide(child) {
            this.appendChild(child);
            child.render(this.slidesWrapper);
            this._slides.push(child);

            this.appendChild(new EM.UI.SliderDot({
                name : 'dot_' + child.name,
                index : child.index
            })).render(this.dotsWrapper);

            this['dot_' + child.name].bind('click', this._dotClickHandlerRef);
            return this;
        },

        /* Boot the slider.
         * @method start <public>
         */
        start : function start(index) {
            this.update(index || 0);
            this._totalSlides = this._slides.length;
            return this;
        },

        /* Shows the next slide.
         * @method next <public>
         */
        next : function next() {
            if (this._index < (this._totalSlides - 1)) {
                return this.update(this._index + 1);
            }

            this._transitionEnd();
        },

        /* Shows the previous slide.
         * @method prev <public>
         */
        prev : function prev() {
            if (this._index > 0) {
                return this.update(this._index - 1);
            }

            this._transitionEnd();
        },

       /* Shows the SliderItem which index on the register Array is equals to
        * the passed index param.
        * @method update <public>
        * @argument index <required> [Number]
        */
        update : function update(index) {
            if (index === this._index) {
                return;
            }

            this._index = index;

            this.children.forEach(function(child) {
                child.deactivate();
            });

            var x = index;
            while(x > 0) {
                x--;
                this._slides[x].old();
            }

            requestAnimationFrame(function() {
                this._slides[this._index].activate();
                this['dot_slider_' + index].activate();

                this.dispatch('change', {
                    slide : this._slides[this._index].data
                });

                onTransitionEnd(this._slides[this._index].element, this._transitionEndRef);
            }.bind(this));

            return this;
        },

        _transitionEnd : function _transitionEnd() {
            this.dispatch('transitionend');
        },

        _dotClickHandler : function _dotClickHandler(ev) {
            this.update(ev.target.index);
        }
    }
});


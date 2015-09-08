var Events = require('./../lib/events');
var addClass = require('./../lib/utils/class-add');
var removeClass = require('./../lib/utils/class-remove');
var hasTouchSupport = require('./../lib/utils/hasTouchSupport');
var throttle = require('./../lib/throttle');

Class(EM.UI, 'RangeSelector').inherits(Widget)({
    HTML : '\
        <div class="range-selector">\
            <div class="range-selector__amounts -pb3 -row -tac -rel">\
                <div class="range-selector__amount -font-light -fl" data-percent="0">$ 16,000 <sub>USD</sub></div>\
                <div class="range-selector__amount -font-light -fl" data-percent="25">$ 30,000 <sub>USD</sub></div>\
                <div class="range-selector__amount -font-light -fl" data-percent="50">$ 50,000 <sub>USD</sub></div>\
                <div class="range-selector__amount -font-light -fl" data-percent="75">$ 100,000 <sub>USD</sub></div>\
                <div class="range-selector__amount -font-light -fl" data-percent="100">$ 150,000+</div>\
                <div class="range-selector__amount-range-indicator"></div>\
            </div>\
            <div class="range-selector__input-wrapper -pb3 -rel">\
                <div class="range-selector__input"></div>\
                <div class="range-selector__slider">\
                    <div class="range-selector__slider__selector"></div>\
                </div>\
            </div>\
        </div>',
    prototype : {
        initialValue : 50,

        _value : 0,
        _isScrolling : false,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.rangeInputEl = this.element.querySelector('.range-selector__input');
            this.rangeSliderEl = this.element.querySelector('.range-selector__slider');
            this.parentChangeCallback = this.onChange;
            this.amountElements = [].slice.call(this.element.querySelectorAll('.range-selector__amount'), 0);
            this.amountElement0 = this.amountElements.filter(function(el) {return el.dataset.percent === '0';})[0];
            this.amountElement25 = this.amountElements.filter(function(el) {return el.dataset.percent === '25';})[0];
            this.amountElement50 = this.amountElements.filter(function(el) {return el.dataset.percent === '50';})[0];
            this.amountElement75 = this.amountElements.filter(function(el) {return el.dataset.percent === '75';})[0];
            this.amountElement100 = this.amountElements.filter(function(el) {return el.dataset.percent === '100';})[0];
            this.amountRangeIndicator = this.element.querySelector('.range-selector__amount-range-indicator');

            this._body = document.body;
            this._setup()._bindEvents();
            this._onChangeValue(this.initialValue);
        },

        _setup : function _setup() {
            this._throttledHandleMouseMove = throttle(this._handleMouseMove, 16, this);
            return this;
        },

        _bindEvents : function _bindEvents() {
            if (hasTouchSupport) {
                this._downEvent = 'touchstart';
                this._moveEvent = 'touchmove';
                this._upEvent = 'touchend';
            } else {
                this._downEvent = 'mousedown';
                this._moveEvent = 'mousemove';
                this._upEvent = 'mouseup';
            }

            Events.on(this.rangeSliderEl, this._downEvent, this._onSliderMouseDown.bind(this));
            Events.on(document, this._moveEvent, this._throttledHandleMouseMove.bind(this));
            Events.on(document, this._upEvent, this._handleMouseUp.bind(this));
        },

        getValue : function getValue() {
            return this._value;
        },

        getBudgetRange : function getBudgetRange() {
            return this.amountElements.filter(function(el) {
                return el.classList.contains('active');
            }).map(function(el) {
                return el.textContent;
            }).join(' - ');
        },

        _onSliderMouseDown : function _onSliderMouseDown() {
            // ev.stopImmediatePropagation();
            this._isScrolling = true;
            addClass(this._body, '-disable-selection');
        },

        _handleMouseMove : function _handleMouseMove(evt) {
            if (!this._isScrolling) {
                return false;
            }

            var sliderRect = this.rangeInputEl.getBoundingClientRect();
            var x = (hasTouchSupport) ? evt.touches[0].pageX : evt.pageX;
            var mouseSliderPercentPosition = (x - sliderRect.left) / sliderRect.width;

            mouseSliderPercentPosition = Math.max(0, mouseSliderPercentPosition);
            mouseSliderPercentPosition = Math.min(mouseSliderPercentPosition, 1);

            this._onChangeValue(mouseSliderPercentPosition * 100);
        },

        _handleMouseUp : function _handleMouseUp() {
            this._isScrolling = false;
            removeClass(this._body, '-disable-selection');
        },

        _updateAmountLabels : function _updateAmountLabels(value) {
            this.amountElements.forEach(function(el) {
                el.classList.remove('active');
            });

            if (value >= 75) {
                //75,100
                this.amountElement75.classList.add('active');
                this.amountElement100.classList.add('active');
                this.amountRangeIndicator.style.left = '70%';
                return;
            }

            if (value >= 50) {
                // 50-75
                this.amountElement50.classList.add('active');
                this.amountElement75.classList.add('active');
                this.amountRangeIndicator.style.left = '50%';
                return;
            }

            if (value >= 25) {
                // 25,50
                this.amountElement25.classList.add('active');
                this.amountElement50.classList.add('active');
                this.amountRangeIndicator.style.left = '30%';
                return;
            }

            // 0-25
            this.amountElement0.classList.add('active');
            this.amountElement25.classList.add('active');
            this.amountRangeIndicator.style.left = '10%';
        },

        _onChangeValue : function _onChangeValue(newValue) {
            this._value = newValue;

            this.rangeSliderEl.style.width = (100 - this.getValue()) + '%';
            this._updateAmountLabels(this.getValue());

            // executing parent onChange callback
            if (this.parentChangeCallback) {
                this.parentChangeCallback({value: this.getValue()});
            }
        },

        destroy : function destroy() {
            Widget.prototype.destroy.call(this);
            Events.off(this.rangeSliderEl, this._downEvent, this._onSliderMouseDown.bind(this));
            Events.off(document, this._moveEvent, this._throttledHandleMouseMove.bind(this));
            Events.off(document, this._upEvent, this._handleMouseUp.bind(this));
            return null;
        }
    }
});

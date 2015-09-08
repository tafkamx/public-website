var Events = require('./../lib/events');
var CONSTANTS = require('./../lib/const');
var isEventSupported = require('./../lib/utils/isEventSupported');
var hasTouchSupport = require('./../lib/utils/hasTouchSupport');
var slidesData = require('./../data/home/slides');

Class(EM.Views, 'Home').inherits(Widget).includes(BubblingSupport)({
    NAME : 'home',
    PATH : '/',
    THUMB : '/img/views/home/thumb.jpg',
    BG : '/img/views/home/slides/01.jpg',
    GRADIENT : '-gradient-01',
    MENU_COLOR : CONSTANTS.COLORS.green,
    TITLE : 'Home',
    SUBTITLE : 'Home Subtitle',

    ELEMENT_CLASS : 'page page-home',
    HTML : '\
        <section>\
            <header class="page__header">\
                <div class="page__header-bg"></div>\
            </header>\
        </section>',

    prototype : {
        _lastY : null,
        _wheelEvent : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.coverElement = this.element.querySelector('.page__header-bg');
            this._wheelEvent = isEventSupported('mousewheel') ? 'mousewheel' : 'wheel';
            this._setup()._bindEvents();
        },

        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.Slider({
                name : 'slider',
                className : '-full-height'
            }));

            slidesData.forEach(function(slideData, index, arr) {
                this.slider.addSlide(new EM.UI.SlideItem({
                    name : 'slider_' + index,
                    data : slideData,
                    index : index,
                    zindex : arr.length - index
                }));
            }, this);

            this.slider.render(this.element.querySelector('.page__header')).start();

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._renderHandlerRef = this._renderHandler.bind(this);
            this.bind('render', this._renderHandlerRef);

            this._sliderTransitionEndRef = this._sliderTransitionEnd.bind(this);
            this.slider.bind('transitionend', this._sliderTransitionEndRef);

            this._sliderChangeRef = this._sliderChange.bind(this);
            this.slider.bind('change', this._sliderChangeRef);
        },

        _renderHandler : function _renderHandler() {
            if (hasTouchSupport) {
                this._touchstartHandlerRef = this._touchstartHandler.bind(this);
                Events.on(this.parent.scrollbar.getViewElement(), 'touchstart', this._touchstartHandlerRef);

                this._touchendHandlerRef = this._touchendHandler.bind(this);
                Events.on(this.parent.scrollbar.getViewElement(), 'touchend', this._touchendHandlerRef);
            } else {
                this._scrollHandlerRef = this._scrollHandler.bind(this);
                Events.on(this.parent.scrollbar.getViewElement(), this._wheelEvent, this._scrollHandlerRef);
            }
        },

        _scrollHandler : function _scrollHandler(ev) {
            var delta  = ev.deltaY || ev.wheelDelta;

            if (this._wheeling) {
                return false;
            }

            this._wheeling = true;

            if (delta > 0) {
                return this.slider.next();
            }

            this.slider.prev();
        },

        _sliderChange : function _sliderChange(ev) {
            this.dispatch('changeMenuColor', {
                color : ev.slide.MENU_COLOR
            });
        },

        _sliderTransitionEnd : function _sliderTransitionEnd() {
            this._wheeling = null;
        },

        _touchstartHandler : function _touchstartHandler(ev) {
            this._lastY = ev.touches[0].clientY;
        },

        _touchendHandler : function _touchendHandler(ev) {
            var currentY = ev.changedTouches[0].clientY;

            if (this._lastY > currentY) {
                return this.slider.next();
            }

            this.slider.prev();
        },

        destroy : function destroy() {
            this.unbind('render', this._renderHandlerRef);
            this._renderHandlerRef = null;

            this.slider.unbind('transitionend', this._sliderTransitionEndRef);
            this._sliderTransitionEndRef = null;

            this.slider.unbind('change', this._sliderChangeRef);
            this._sliderChangeRef = null;

            if (hasTouchSupport) {
                Events.off(this.parent.scrollbar.getViewElement(), 'touchstart', this._touchstartHandlerRef);
                this._touchstartHandlerRef = null;

                Events.off(this.parent.scrollbar.getViewElement(), 'touchend', this._touchendHandlerRef);
                this._touchendHandlerRef = null;
            } else {
                Events.off(this.parent.scrollbar.getViewElement(), this._wheelEvent, this._scrollHandlerRef);
                this._scrollHandlerRef = null;
            }

            Widget.prototype.destroy.call(this);
        }
    }
});

var Vivus = require('vivus');
var Events = require('./../lib/events');
var CONSTANTS = require('./../lib/const');
// var isInViewport = require('./../lib/is-in-viewport');
var hasTouchSupport = require('./../lib/utils/hasTouchSupport');
// window.efp = require('./../lib/efp');

Class(EM.Views, 'WhatWeDo').inherits(Widget).includes(BubblingSupport)({
    NAME : 'what-we-do',
    PATH : '/what-we-do',
    THUMB : '/img/views/what-we-do/thumb.jpg',
    BG : '/img/views/what-we-do/cover-image.jpg',
    GRADIENT : '-gradient-03',
    MENU_COLOR : CONSTANTS.COLORS.pink,
    TITLE : 'What We Do',
    SUBTITLE : 'Services & Approach',

    ELEMENT_CLASS : 'page page-what-we-do',
    HTML : '\
        <section>\
            <div class="hit-nor -rel">\
                <div data-hitnor></div>\
                <div class="page__container">\
                    <div class="page__intro -tac -p5">\
                        <h2 class="page__body-title -font-bold">The user’s experience is wrapped around everything we do.</h2>\
                        <p class="page__intro-text -font-light">As engineers, designers and managers, we master strategic disciplines that are applied every day – individually and as a team – across the offerings we provide. Through these we turn meaningful ideas into innovative digital solutions with a permanent perspective of achieving the most positive experience possible for the people that use them. Yes, all of us have UX in our heads all the time.</p>\
                    </div>\
                </div>\
            </div>\
            <div class="hit-fix -rel">\
                <div data-hitfix></div>\
                <section class="what-we-do__disciplines-wrapper -rel"></section>\
            </div>\
            <div class="hit-abs -rel">\
                <div data-hitabs></div>\
                <div class="-color-bg-neutral-xx-dark">\
                    <section class="what-we-do__offerings-wrapper page__container">\
                        <div class="page__intro -pb5 -pt5">\
                            <div data-section="offerings" class="-tac">\
                                <h2 class="page__body-title -font-bold">Offerings</h2>\
                                <p class="page__intro-text -font-light">All these disciplines go into the things we create with our partners. The innovative mediums that help them grow and accomplish their goals. They can be operational, educational, social-focused or just to have fun.</p>\
                            </div>\
                        </div>\
                    </section>\
                </div>\
                <div class="page__container">\
                    <section class="work-with-us -tac">\
                        <h2 class="work-with-us__title -font-bold -after-line">So what’s your vision?</h2>\
                        <p class="work-with-us__text -font-light">Let’s talk to get to know each other and discover what we can accomplish together.</p>\
                        <p class="work-with-us__text -mb2 -font-light">Get started by filling out our brief form, it’ll help us have an informed conversation with you.</p>\
                        <button data-project-planner-btn class="ui-btn -lg -pink -pl5 -pr5 -mb2">\
                            <span class="-rel">Project Planner</span>\
                        </button>\
                        <p class="work-with-us__small -font-light">Don’t feel like filling the form?</p>\
                        <p class="work-with-us__small -font-light">Drop us a line at <a class="-link -pink" href="mailto:partners@empathia.agency" tartget="_blank">partners@empathia.agency</a>.</p>\
                    </section>\
                </div>\
            </div>\
        </section>',

    prototype : {
        _state: {
            nor: false,
            fix: false,
            abs: false
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.hitNor = this.element.querySelector('[data-hitnor]');
            this.hitFix = this.element.querySelector('[data-hitfix]');
            this.hitAbs = this.element.querySelector('[data-hitabs]');
            this._setup();
        },

        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });

            this.circleWidget.center();
            this.headerWidget.activate();
            this.__bindEvents();

            if (hasTouchSupport) {
                return this;
            }

            this.vivusApps = new Vivus('xx-svg-cloud-stroke', {
                start: 'manual',
                type: 'oneByOne',
                duration: 50
            });

            this.vivusCommerce = new Vivus('xx-svg-commerce-stroke', {
                start: 'manual',
                type: 'oneByOne',
                duration: 60
            });

            this.vivusBrand = new Vivus('xx-svg-brand-stroke', {
                start: 'manual',
                type: 'oneByOne',
                duration: 100
            });

            this.vivusMobile = new Vivus('xx-svg-mobile-stroke', {
                start: 'manual',
                type: 'oneByOne',
                duration: 70
            });

            return this;
        },

        _setup : function _setup() {
            var disciplinesWrapper = this.element.querySelector('.what-we-do__disciplines-wrapper');

            this.appendChild(new EM.UI.PageCover({
                name : 'headerWidget',
                data : {
                    subheading : 'What we do',
                    heading : 'We enrich the lives of<br/>people on a daily basis.',
                    background : this.constructor.BG,
                    backgroundClassName : this.constructor.GRADIENT,
                    scrollInfo : 'Scroll down to learn how we do it.'
                }
            })).render(null, this.element.querySelector('.hit-nor').firstElementChild);

            this.appendChild(new EM.UI.WhatWeDoDisciplines({
                name : 'disciplines'
            })).render(disciplinesWrapper);

            this.appendChild(new EM.UI.WhatWeDoOfferings({
                name : 'offerings'
            })).render(this.element.querySelector('.what-we-do__offerings-wrapper'));

            this.appendChild(new EM.UI.WhatWeDoCircle({
                name : 'circleWidget',
                referenceElement : this.element.querySelector('.what-we-do__disciplines-row').firstElementChild
            })).render(disciplinesWrapper);

            this.appendChild(new EM.UI.BottomPageLinks({
                name : 'linksWidget',
                views : [EM.Views.AboutUs, EM.Views.Careers]
            })).render(this.element.querySelector('.hit-abs'));

            return this;
        },

       __bindEvents : function __bindEvents() {
            this._projectPlannerBtnClickHandlerRef = this._projectPlannerBtnClickHandler.bind(this);
            Events.on(this.element.querySelector('[data-project-planner-btn]'), 'click', this._projectPlannerBtnClickHandlerRef);

            if (!hasTouchSupport) {
                this._scrollHandlerRef = this._scrollHandler.bind(this);
                Events.on(this.parent.scrollbar.getViewElement(), 'scroll', this._scrollHandlerRef);
            }

            this._resizeHandlerRef = this._resizeHandler.bind(this);
            Events.on(window, 'resize', this._resizeHandlerRef);
            this._globals();
        },

        _globals : function _globals() {
            this.w = ~~(window.innerWidth);
            this.h = ~~(window.innerHeight);
            this.cx = ~~(this.w/2) - 10;
            this.cy = ~~(this.h/2);
            this.cyHalf = ~~(this.cy/2);
            this.cy14 = this.cy - this.cyHalf;
            this.cy34 = this.cy + this.cyHalf;
        },

        _resizeHandler : function _renderHandler() {
            this._globals();
            this.circleWidget.center();
        },

        _scrollHandler : function _scrollHandler() {
            if (this.w <= 768) {
                return;
            }

            var T = document.elementFromPoint(0, 1);
            var B = document.elementFromPoint(0, this.h-1);
            var M = document.elementFromPoint(this.cx, this.cy);
            var BCX = document.elementFromPoint(this.cx, this.h-1);

            if (T === this.hitNor) {
                if (this._state.nor === false) {
                    this._state.nor = true;
                    this._state.fix = false;
                    this._state.abs = false;

                    this.circleWidget.nor();
                }
            } else if (B === this.hitAbs) {
                if (this._state.abs === false) {
                    this._state.abs = true;
                    this._state.nor = false;
                    this._state.fix = false;

                    this.circleWidget.abs();
                }
            } else if (T === this.hitFix) {
                if (this._state.fix === false) {
                    this._state.fix = true;
                    this._state.nor = false;
                    this._state.abs = false;

                    this.circleWidget.fix();

                    this.vivusApps.reset();
                    this.vivusCommerce.reset();
                    this.vivusBrand.reset();
                    this.vivusMobile.reset();
                }
            }

            if (typeof M.dataset.discipline !== 'undefined') {
                this.circleWidget.showDiscipline(M.dataset.name);
            }

            if (typeof BCX.dataset.offering !== 'undefined') {
                if (BCX.dataset.name === 'applications-and-platforms') {
                    return this.vivusApps.play();
                }

                if (BCX.dataset.name === 'e-commerce') {
                    return this.vivusCommerce.play();
                }

                if (BCX.dataset.name === 'brand-development') {
                    return this.vivusBrand.play();
                }

                if (BCX.dataset.name === 'mobile') {
                    return this.vivusMobile.play();
                }
            }
       },

        /* Dispatch a custom event `showProjectPlanner`, uses BubblingSupport to bubble up to App.
         * @method _projectPlannerBtnClickHandler <private>
         */
        _projectPlannerBtnClickHandler : function _projectPlannerBtnClickHandler() {
            this.dispatch('showProjectPlanner');
        },

        destroy : function destroy() {
            if (!hasTouchSupport) {
                Events.off(this.parent.scrollbar.getViewElement(), 'scroll', this._scrollHandlerRef);
                this._scrollHandlerRef = null;
            }

            Events.off(window, 'resize', this._resizeHandlerRef);
            this._resizeHandlerRef = null;
            Events.off(this.element.querySelector('[data-project-planner-btn]'), 'click', this._projectPlannerBtnClickHandlerRef);
            this._projectPlannerBtnClickHandlerRef = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});

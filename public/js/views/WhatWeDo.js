// var Vivus = require('vivus');
var Events = require('./../lib/events');
var CONSTANTS = require('./../lib/const');
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
            <div class="page__body">\
                <div class="page__intro -tac -pb5 -pt5">\
                    <h2 class="page__body-title -font-bold">The user’s experience is wrapped around everything we do.</h2>\
                    <p class="page__intro-text -font-light">As engineers, designers and managers, we master strategic disciplines that are applied every day – individually and as a team – across the offerings we provide. Through these we turn meaningful ideas into innovative digital solutions with a permanent perspective of achieving the most positive experience possible for the people that use them. Yes, all of us have UX in our heads all the time.</p>\
                </div>\
                <section class="what-we-do__disciplines-wrapper"></section>\
                <section class="what-we-do__offerings-wrapper -color-bg-neutral-xx-dark">\
                    <div class="page__intro -pb5 -pt5">\
                        <div data-section="offerings" class="-tac">\
                            <h2 class="page__body-title -font-bold">Offerings</h2>\
                            <p class="page__intro-text -font-light">All these disciplines go into the things we create with our partners. The innovative mediums that help them grow and accomplish their goals. They can be operational, educational, social-focused or just to have fun.</p>\
                        </div>\
                    </div>\
                </section>\
                <section class="work-with-us -tac">\
                    <h2 class="work-with-us__title -font-bold -after-line">So what’s your vision?</h2>\
                    <p class="work-with-us__text -font-light">Let’s talk to get to know each other and discover what we can accomplish together.</p>\
                    <p class="work-with-us__text -mb2 -font-light">Get started by filling out our brief form, it’ll help us have an informed conversation with you.</p>\
                    <button data-project-planner-btn class="ui-btn -lg -pink -pl5 -pr5 -mb2">Project Planner</button>\
                    <p class="work-with-us__small -font-light">Don’t feel like filling the form?</p>\
                    <p class="work-with-us__small -font-light">Drop us a line at newbusiness@empathya.agency.</p>\
                </section>\
            </div>\
        </section>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup();
        },

        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });

            this.circleWidget.center();
            this.headerWidget.activate();

            // this.vivusApps = new Vivus('xx-svg-cloud-stroke', {
            //     start: 'manual',
            //     type: 'oneByOne',
            //     duration: 50
            // });

            // this.vivusCommerce = new Vivus('xx-svg-commerce-stroke', {
            //     start: 'manual',
            //     type: 'oneByOne',
            //     duration: 60
            // });

            // this.vivusBrand = new Vivus('xx-svg-brand-stroke', {
            //     start: 'manual',
            //     type: 'oneByOne',
            //     duration: 100
            // });

            // this.vivusMobile = new Vivus('xx-svg-mobile-stroke', {
            //     start: 'manual',
            //     type: 'oneByOne',
            //     duration: 70
            // });

            this.__bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.PageCover({
                name : 'headerWidget',
                data : {
                    subheading : 'What we do',
                    heading : 'We enrich the lives of<br/>people on a daily basis.',
                    background : this.constructor.BG,
                    backgroundClassName : this.constructor.GRADIENT,
                    scrollInfo : 'Scroll down to learn how we do it.'
                }
            })).render(this.element, this.element.firstElementChild);

            this.appendChild(new EM.UI.WhatWeDoDisciplines({
                name : 'disciplines'
            })).render(this.element.querySelector('.what-we-do__disciplines-wrapper'));

            this.appendChild(new EM.UI.WhatWeDoOfferings({
                name : 'offerings'
            })).render(this.element.querySelector('.what-we-do__offerings-wrapper'));

            this.appendChild(new EM.UI.WhatWeDoCircle({
                name : 'circleWidget',
                referenceElement : this.element.querySelector('.what-we-do__disciplines-row').firstElementChild
            })).render(document.body);

            this.appendChild(new EM.UI.BottomPageLinks({
                name : 'linksWidget',
                views : [EM.Views.AboutUs, EM.Views.Careers]
            })).render(this.element);

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

            var A = document.elementFromPoint(this.cx, this.cy14);
            var Z = document.elementFromPoint(this.cx, this.cy34);
            var M = document.elementFromPoint(this.cx, this.cy);

            if (typeof A.dataset.discipline === 'undefined' || typeof Z.dataset.discipline === 'undefined') {
                if (this.circleWidget.active) {
                    this.circleWidget.deactivate();
                }
                return;
            }

            if (this.circleWidget.active === false) {
                this.circleWidget.activate();
            }

            this.circleWidget.showDiscipline(M.dataset.name);

            // if (typeof A.dataset.offering !== 'undefined' || typeof Z.dataset.offering !== 'undefined') {
            //     if (M.dataset.name === 'applications-and-platforms') {
            //         return this.vivusApps.play();
            //     }

            //     if (M.dataset.name === 'e-commerce') {
            //         return this.vivusCommerce.play();
            //     }

            //     if (M.dataset.name === 'brand-development') {
            //         return this.vivusBrand.play();
            //     }

            //     if (M.dataset.name === 'mobile') {
            //         return this.vivusMobile.play();
            //     }
            // }
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

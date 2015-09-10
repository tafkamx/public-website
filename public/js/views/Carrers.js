var JobsData = require('./../data/carrers/jobs');
var Events = require('./../lib/events');
var CONSTANTS = require('./../lib/const');
var hasTouchSupport = require('./../lib/utils/hasTouchSupport');
// var skrollTo = require('scrollto');
var TextGradient = require('./../lib/text-gradient');
// window.efp = require('./../lib/efp');

Class(EM.Views, 'Carrers').inherits(Widget).includes(BubblingSupport)({
    NAME : 'carrers',
    PATH : '/carrers',
    THUMB : '/img/views/carrers/thumb.jpg',
    BG : '/img/views/carrers/cover-image.jpg',
    GRADIENT : '-gradient-01',
    MENU_COLOR : CONSTANTS.COLORS.green,
    TITLE : 'Carrers',
    SUBTITLE : 'On the lookout for you',

    ELEMENT_CLASS : 'page page-carrers',
    HTML : '\
        <section>\
            <div class="page__body">\
                <div class="page__intro-wrapper -color-bg-neutral-xx-light">\
                    <div class="page__intro -tac">\
                        <h2 class="page__body-title -font-extra-light">\
                            We look for talent, passion, curiosity and conviction.<br/>\
                            But above all, for <span class="-font-bold">people who give a sh*t.</span>\
                        </h2>\
                        <p class="page__intro-text -font-light">We really take out time hiring. It’s very hard to find talented people but it’s much harder to come by people with talent and also a genuine care for what they do and for others. At Empathya we cultivate a culture and environment that makes it easy for people with these qualities to thrive, and honestly, it’s the only kind of people we want in our staff. We all believe in the same thing and we want to keep it that way.</p>\
                    </div>\
                </div>\
                <article class="carrers__image-strip -row">\
                    <div class="image-strip"></div>\
                    <div class="image-strip"></div>\
                    <div class="image-strip"></div>\
                    <div class="image-strip"></div>\
                    <div class="image-strip"></div>\
                </article>\
                <section class="carrers__were-all">\
                    <article data-snap data-name="designers" class="were-all-item -row -vh">\
                        <div class="were-all-phrase -col-6 -table -vh">\
                            <div class="-table-cell -vam on-touch">\
                                <div class="waa__main-text -font-light">We’re all</div>\
                                <div data-name="designers" class="waa__keyword -font-bold">designers</div>\
                            </div>\
                        </div>\
                        <div class="were-all-text -col-6 -table -vh">\
                            <div class="-table-cell -vam">\
                                <p>We all actively contribute to carefully plan every project we work on. Using our wide range of knowledge, whether it’s in the field of engineering, creative, management or business, we prepare to execute. That plan is called Design. So ultimately, <span class="-color-green">we’re all designers</span>.</p>\
                            </div>\
                        </div>\
                    </article>\
                    <article data-snap data-name="friends" class="were-all-item -row -vh">\
                        <div class="were-all-phrase -col-6 -table -vh">\
                            <div class="-table-cell -vam on-touch">\
                                <div class="waa__main-text -font-light">We’re all</div>\
                                <div data-name="designers" class="waa__keyword -font-bold">friends.</div>\
                            </div>\
                        </div>\
                        <div class="were-all-text -col-6 -table -vh">\
                            <div class="-table-cell -vam">\
                                <p>The greatest strength we have as an organization is our camaraderie. We share and nurture diverse passions in our lives, but most importantly, we know our worth is as much as what we value others.</p>\
                            </div>\
                        </div>\
                    </article>\
                    <article data-snap data-name="driven" class="were-all-item -row -vh">\
                        <div class="were-all-phrase -col-6 -table -vh">\
                            <div class="-table-cell -vam on-touch">\
                                <div class="waa__main-text -font-light">We’re all</div>\
                                <div data-name="designers" class="waa__keyword -font-bold">purpose driven.</div>\
                            </div>\
                        </div>\
                        <div class="were-all-text -col-6 -table -vh">\
                            <div class="-table-cell -vam">\
                                <p>We have learned tons from our past experiences and we’ve seen the ugly and the beautiful. We want to make a difference so we are after the awesome game-changing things and experiences that happen when you give a shit.</p>\
                            </div>\
                        </div>\
                    </article>\
                    <article data-snap data-name="best" class="were-all-item -row -vh">\
                        <div class="were-all-phrase -col-6 -table -vh">\
                            <div class="-table-cell -vam on-touch">\
                                <div class="waa__main-text -font-light">We’re all</div>\
                                <div data-name="designers" class="waa__keyword -font-bold">among the best.</div>\
                            </div>\
                        </div>\
                        <div class="were-all-text -col-6 -table -vh">\
                            <div class="-table-cell -vam">\
                                <p>An average of 15 years experience of creating innovative products, platforms and tools that millions of people around the world use everyday puts us high up on the “best of the best” list. And we love to help others climb their way up together with us.</p>\
                            </div>\
                        </div>\
                    </article>\
                </section>\
                <article class="carrers__quote-wrapper -color-bg-neutral-xx-dark -color-white -row">\
                    <blockquote class="testimonial-blockquote -rel">\
                        <svg class="testimonial-quote -abs">\
                            <use xlink:href="#svg-quotes"></use>\
                        </svg>\
                        <p class="testimonial-text -fsi -font-light -rel">\
                            At Empathya, we take pride in the level of craft and polish we put into our work. Our team is smart and highly talented — and bonus, we love hanging out with each other.\
                        </p>\
                        <footer class="-mt4">\
                            <cite class="testimonial-cite -fsn">\
                                Chupau<br/>\
                                <span class="cite-sec -font-light -color-neutral-light">Q/A Chief</span>\
                            </cite>\
                        </footer>\
                    </blockquote>\
                </article>\
                <section class="perks -color-bg-neutral-xx-light -tac">\
                    <h2 data-perks-text class="perks-title -font-light">Perks You’ll Like</h2>\
                    <div class="perks__list -row">\
                        <div class="perks__item -tac -col-3">\
                            <div class="perks__item-icon">\
                                <svg fill="url(#gradient-1)" class="-s100r"><use xlink:href="#svg-document"></use></svg>\
                            </div>\
                            <p class="perk-title -mb1 -mt2 -font-bold">Legal Benefits</p>\
                            <p class="perk-desc -color-neutral-light">Social Security (IMSS), State savings plan (Infonavit), retirement plan, yearly bonus, etc.</p>\
                        </div>\
                        <div class="perks__item -tac -col-3">\
                            <div class="perks__item-icon">\
                                <svg fill="url(#gradient-2)" class="-s100r"><use xlink:href="#svg-coconut"></use></svg></div>\
                            <p class="perk-title -mb1 -mt2 -font-bold">Paid Time Off</p>\
                            <p class="perk-desc -color-neutral-light">10 paid holidays, 10 days of paid vacations and 5 paid sick days every year.</p>\
                        </div>\
                        <div class="perks__item -tac -col-3">\
                            <div class="perks__item-icon">\
                                <svg fill="url(#gradient-3)" class="-s100r"><use xlink:href="#svg-paper-jet"></use></svg>\
                            </div>\
                            <p class="perk-title -mb1 -mt2 -font-bold">Travel Allowance</p>\
                            <p class="perk-desc -color-neutral-light">80,000 km per year via the Skyteam/Aeromexico Premier membership plan.</p>\
                        </div>\
                        <div class="perks__item hardware -tac -col-3">\
                            <div class="perks__item-icon">\
                                <svg fill="url(#gradient-4)"><use xlink:href="#svg-screen"></use></svg>\
                            </div>\
                            <p class="perk-title -mb1 -mt2 -font-bold">Apple Love</p>\
                            <p class="perk-desc -color-neutral-light">Everyone is hooked up with a personal Macbook Pro and a Thunderbolt Display.</p>\
                        </div>\
                    </div>\
                </section>\
                <section class="join-us -tac">\
                    <p data-believe-text class="join-us__subtitle -m0 -font-light">Do you believe what we believe?</p>\
                    <h2 class="join-us__title -mt0 -font-bold">Come join us!</h2>\
                </section>\
            </div>\
        </section>',

    prototype : {
        SCROLL_TRANSITION_MS : 1000,
        _lastScrollTop : null,

        _fixedTest : false,
        _snapText : false,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup();
        },

        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });

            this.__bindEvents();
            this.weAreAllWidget.center();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.PageCover({
                name : 'headerWidget',
                data : {
                    subheading : 'Carrers',
                    heading : 'Making positive impacts<br/>will change your life.',
                    background : this.constructor.BG,
                    backgroundClassName : this.constructor.GRADIENT,
                    scrollInfo : 'Scroll down to find out what it takes.'
                }
            })).render(this.element, this.element.firstElementChild);

            this.appendChild(new EM.UI.WeAreAll({
                name : 'weAreAllWidget',
                referenceElement : this.element.querySelector('.were-all-item').firstElementChild
            })).render(document.body);

            this.perksText = new TextGradient({
                selector : this.element.querySelector('[data-perks-text]'),
                from : CONSTANTS.COLORS.blue,
                to : CONSTANTS.COLORS.green,
                direction : '-225deg'
            }).render();

            this.believeText = new TextGradient({
                selector : this.element.querySelector('[data-believe-text]'),
                from : CONSTANTS.COLORS.blue,
                to : CONSTANTS.COLORS.green,
                direction : '-225deg'
            }).render();

            this.appendChild(new EM.UI.JoinUsMessage({
                name : 'joinUsMessage',
                data : {
                    jobs : JobsData
                }
            })).render(this.element.querySelector('.join-us'));

            this.appendChild(new EM.UI.BottomPageLinks({
                name : 'links',
                views : [EM.Views.Community, EM.Views.Journal]
            })).render(this.element);
        },

        __bindEvents : function __bindEvents() {
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
            this.weAreAllWidget.center();
        },

        _spyScroll : true,
        _snaping : false,
        _scrollHandler : function _scrollHandler(ev) {
            if (this.w <= 768) {
                return;
            }

            var scrollTop = ev.currentTarget.scrollTop;
            var scrollingUp = (scrollTop < this._lastScrollTop);
            var x = this.cx;
            // var y = (scrollingUp) ? 0 : (this.h - 1);

            this._lastScrollTop = scrollTop;

            // if (this._spyScroll === false) {
            //     return;
            // }

            // var el = document.elementFromPoint(x, y);
            var elA = document.elementFromPoint(x, this.cy14);
            var elB = document.elementFromPoint(x, this.cy34);

            if (typeof elA.dataset.snap !== 'undefined' && typeof elB.dataset.snap !== 'undefined') {
                var el = scrollingUp ? elA : elB;

            // if (typeof el.dataset.snap !== 'undefined') {
                // this._spyScroll = false;
                var name = el.dataset.name;

                if (name) {
                    this.weAreAllWidget.showKeyword(name);
                }

                this.weAreAllWidget.activate();
                return;

                // return skrollTo(this.parent.scrollbar.getViewElement(), {
                //     x: 0,
                //     y: ~~el.getBoundingClientRect().top,
                //     duration: this.SCROLL_TRANSITION_MS,
                //     onComplete : function() {
                //         this.weAreAllWidget.activate();
                //         this._scrollToAnimationEnd();
                //     }.bind(this)
                // });
            }

            this.weAreAllWidget.deactivate();
        },

        _scrollToAnimationEnd : function _scrollToAnimationEnd() {
            window.setTimeout(function() {
                this._spyScroll = true;
            }.bind(this), 100);
        },

        destroy : function destroy() {
            if (!hasTouchSupport) {
                Events.off(this.parent.scrollbar.getViewElement(), 'scroll', this._scrollHandlerRef);
                this._scrollHandlerRef = null;
            }
            Events.off(window, 'resize', this._resizeHandlerRef);
            this._resizeHandlerRef = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});

var JobsData = require('./../data/careers/jobs');
var Events = require('./../lib/events');
var CONSTANTS = require('./../lib/const');
var hasTouchSupport = require('./../lib/utils/hasTouchSupport');
var TextGradient = require('text-gradient');
// window.efp = require('./../lib/efp');

Class(EM.Views, 'Careers').inherits(Widget).includes(BubblingSupport)({
    NAME : 'careers',
    PATH : '/careers',
    THUMB : '/img/views/careers/thumb.jpg',
    BG : '/img/views/careers/cover-image.jpg',
    GRADIENT : '-gradient-01',
    MENU_COLOR : CONSTANTS.COLORS.green,
    TITLE : 'Careers',
    SUBTITLE : 'On the lookout for you',

    ELEMENT_CLASS : 'page page-careers',
    HTML : '\
        <section>\
            <div class="hit-nor -rel">\
                <div data-hitnor></div>\
                <div class="page__intro-wrapper -color-bg-neutral-xx-light">\
                    <div class="page__intro page__container -pl5 -pr5 -tac">\
                        <h2 class="page__body-title -font-extra-light">\
                            We look for talent, passion, curiosity and conviction.<br/>\
                            But above all, for <span class="-font-bold">people who give a sh*t.</span>\
                        </h2>\
                        <p class="page__intro-text -font-light">We really take out time hiring. It’s very hard to find talented people but it’s much harder to come by people with talent and also a genuine care for what they do and for others. At Empathia we cultivate a culture and environment that makes it easy for people with these qualities to thrive, and honestly, it’s the only kind of people we want in our staff. We all believe in the same thing and we want to keep it that way.</p>\
                    </div>\
                </div>\
            </div>\
            <div class="hit-fix -rel">\
                <div data-hitfix></div>\
                <section class="careers__were-all page__container -pl5 -pr5 -rel">\
                    <article class="were-all-item -row">\
                        <div class="were-all-phrase -col-6 -table -full-height">\
                            <div class="-table-cell -vam on-touch">\
                                <div class="waa__main-text -font-light">We’re all</div>\
                                <div data-name="designers" class="waa__keyword -font-bold">designers</div>\
                            </div>\
                        </div>\
                        <div class="were-all-text -col-6 -table -full-height">\
                            <div class="-table-cell -vam">\
                                <p data-snap data-name="designers">We all actively contribute to carefully plan every project we work on. Using our wide range of knowledge, whether it’s in the field of engineering, creative, management or business, we prepare to execute. That plan is called Design. So ultimately, we’re all designers.</p>\
                            </div>\
                        </div>\
                    </article>\
                    <article class="were-all-item -row">\
                        <div class="were-all-phrase -col-6 -table -full-height">\
                            <div class="-table-cell -vam on-touch">\
                                <div class="waa__main-text -font-light">We’re all</div>\
                                <div data-name="designers" class="waa__keyword -font-bold">friends.</div>\
                            </div>\
                        </div>\
                        <div class="were-all-text -col-6 -table -full-height">\
                            <div class="-table-cell -vam">\
                                <p data-snap data-name="friends">The greatest strength we have as an organization is our camaraderie. We share and nurture diverse passions in our lives, but most importantly, we know our worth is as much as what we value others.</p>\
                            </div>\
                        </div>\
                    </article>\
                    <article class="were-all-item -row">\
                        <div class="were-all-phrase -col-6 -table -full-height">\
                            <div class="-table-cell -vam on-touch">\
                                <div class="waa__main-text -font-light">We’re all</div>\
                                <div data-name="designers" class="waa__keyword -font-bold">purpose driven.</div>\
                            </div>\
                        </div>\
                        <div class="were-all-text -col-6 -table -full-height">\
                            <div class="-table-cell -vam">\
                                <p data-snap data-name="purpose driven">We have learned tons from our past experiences and we’ve seen the ugly and the beautiful. We want to make a difference so we are after the awesome game-changing things and experiences that happen when you give a shit.</p>\
                            </div>\
                        </div>\
                    </article>\
                    <article class="were-all-item -row">\
                        <div class="were-all-phrase -col-6 -table -full-height">\
                            <div class="-table-cell -vam on-touch">\
                                <div class="waa__main-text -font-light">We’re all</div>\
                                <div data-name="designers" class="waa__keyword -font-bold">among the best.</div>\
                            </div>\
                        </div>\
                        <div class="were-all-text -col-6 -table -full-height">\
                            <div class="-table-cell -vam">\
                                <p data-snap data-name="among the best">An average of 15 years experience of creating innovative products, platforms and tools that millions of people around the world use everyday puts us high up on the “best of the best” list. And we love to help others climb their way up together with us.</p>\
                            </div>\
                        </div>\
                    </article>\
                </section>\
            </div>\
            <div class="hit-abs -rel">\
                <div data-hitabs></div>\
                <div class="-color-bg-neutral-xx-light">\
                    <section class="perks page__container -tac">\
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
                </div>\
                <section class="join-us page__container -tac">\
                    <p data-believe-text class="join-us__subtitle -m0 -font-light">Do you believe what we believe?</p>\
                    <h2 class="join-us__title -mt0 -font-bold">Come join us!</h2>\
                </section>\
            </div>\
        </section>',

    prototype : {
        _availableHeight : 0,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.weAreAllItems = [].slice.call(this.element.querySelectorAll('.were-all-item'), 0);
            this.hitNor = this.element.querySelector('[data-hitnor]');
            this.hitFix = this.element.querySelector('[data-hitfix]');
            this.hitAbs = this.element.querySelector('[data-hitabs]');
            this._setup();
        },

        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });

            this.__bindEvents();
            this.headerWidget.activate();
            this._resizeHandler();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.PageCover({
                name : 'headerWidget',
                data : {
                    subheading : 'Careers',
                    heading : 'Making positive impacts<br/>will change your life.',
                    background : this.constructor.BG,
                    backgroundClassName : this.constructor.GRADIENT,
                    scrollInfo : 'Scroll down to find out what it takes.'
                }
            })).render(null, this.element.querySelector('.hit-nor').firstElementChild);

            this.appendChild(new EM.UI.ImageStrip({
                name : 'imageStrip'
            })).render(null, this.element.querySelector('.hit-fix').firstElementChild);

            this.appendChild(new EM.UI.WeAreAll({
                name : 'weAreAllWidget',
                referenceElement : this.element.querySelector('.were-all-item').firstElementChild
            })).render(this.element.querySelector('.careers__were-all'));

            this.perksText = new TextGradient(this.element.querySelector('[data-perks-text]'), {
                from : CONSTANTS.COLORS.blue,
                to : CONSTANTS.COLORS.green,
                direction : '-45deg'
            });

            this.believeText = new TextGradient(this.element.querySelector('[data-believe-text]'), {
                from : CONSTANTS.COLORS.blue,
                to : CONSTANTS.COLORS.green,
                direction : '-45deg'
            });

            this.appendChild(new EM.UI.JoinUsMessage({
                name : 'joinUsMessage',
                data : {jobs : JobsData}
            })).render(this.element.querySelector('.join-us'));

            this.appendChild(new EM.UI.BottomPageLinks({
                name : 'links',
                views : [EM.Views.Community, EM.Views.Journal]
            })).render(this.element.querySelector('.hit-abs'));
        },

        /* Subscribe to events after the widget had been rendered.
         * @method __bindEvents <private>
         */
        __bindEvents : function __bindEvents() {
            if (!hasTouchSupport) {
                this._scrollHandlerRef = this._scrollHandler.bind(this);
                Events.on(this.parent.scrollbar.getViewElement(), 'scroll', this._scrollHandlerRef);

                this.weAreAllWidget.activate();
            }

            this._resizeHandlerRef = this._resizeHandler.bind(this);
            Events.on(window, 'resize', this._resizeHandlerRef);
        },

        /* Updates global variables based on window size.
         * @method _globals <private>
         */
        _globals : function _globals() {
            this.w = ~~(window.innerWidth);
            this.h = ~~(window.innerHeight);
            this.cx = ~~(this.w/2);
            this.cy = ~~(this.h/2);
            this.availableCY = this.h - (this._availableHeight / 2);
        },

        /* Handles the window resize event.
         * @method _resizeHandler <private>
         */
        _resizeHandler : function _renderHandler() {
            this.imageStrip.updateHeight();
            this._availableHeight = this.imageStrip.getRemainingHeight();

            this._globals();
            this.weAreAllWidget.center(this._availableHeight);
            this.weAreAllItems.forEach(function(item) {
                item.style.height = this._availableHeight + 'px';
            }, this);
        },

        /* Handles the scroll event.
         * @method _scrollHandler <private>
         */
        _scrollHandler : function _scrollHandler() {
            if (this.w <= 768) {
                return;
            }

            var M = document.elementFromPoint(this.cx + 10, this.availableCY);
            var T = document.elementFromPoint(0, 1);
            var B = document.elementFromPoint(0, this.h-1);

            if (T === this.hitNor) {
                this.imageStrip.nor();
                this.weAreAllWidget.nor();
            } else if (B === this.hitAbs) {
                this.imageStrip.abs();
                this.weAreAllWidget.abs();
            } else if (T === this.hitFix) {
                this.imageStrip.fix();
                this.weAreAllWidget.fix();
            }

            if (typeof M.dataset.snap !== 'undefined') {
                this.weAreAllWidget.showKeyword(M.dataset.name);
            }
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

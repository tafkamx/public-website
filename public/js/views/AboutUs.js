var CONSTANTS = require('./../lib/const');
var Events = require('./../lib/events');
var teamData = require('./../data/about-us/team');
var TextGradient = require('text-gradient');

Class(EM.Views, 'AboutUs').inherits(Widget).includes(BubblingSupport)({
    NAME : 'about-us',
    PATH : '/about-us',
    THUMB : '/img/views/about-us/thumb.jpg',
    BG : '/img/views/about-us/cover-image.jpg',
    GRADIENT : '-gradient-04',
    MENU_COLOR : CONSTANTS.COLORS.greypurple,
    TITLE : 'About Us',
    SUBTITLE : 'Why we do this',

    ELEMENT_CLASS : 'page page-about-us',
    HTML : '\
        <section>\
            <div class="page__body">\
                <div class="page__intro-wrapper -color-bg-neutral-xx-light">\
                    <div class="page__intro -tac">\
                        <h2 class="page__body-title -font-bold">Why We Exist</h2>\
                        <p class="page__intro-text -font-light">This is a crowded industry with many companies competing in the digital environment, but very few of them providing value creation with the products and services they make. <span class="-color-purple">Our process is important and very good</span>, but what really places us in a tiny group of awesome firms is that we seek to ask the right questions before attempting to find an answer. We are a talented group of awesome people on a life mission to make people’s lives better through design and innovation. Fuel partners whom we believe in and that combine profit and purpose. Together we can make things that are beneficial and valuable to the world.\
                        <br/><span class="-font-bold">We believe in a world where things work better.</span></p>\
                    </div>\
                </div>\
                <div class="about-us__pillars-text -tac">\
                    <h2 data-pillars-text class="page__body-title -font-extra-light -noafter -m0">Our Four Pillars</h2>\
                    <p class="font-medium-size -font-light">We care about people and the world we live in as much as our partners do. They work with us because of the strong commitment we feel for their goals, dreams and aspirations. The guiding principles that allow us to support and build these long-lasting relationships dictate what decisions we make.</p>\
                </div>\
                <div class="about-us__pillars -tac -row">\
                    <div class="pillars-principle-col -col-4 -tar">\
                        <div class="principle principle__a">\
                            <p class="principle__title">Human Centered</p>\
                            <p class="principle__desc -font-light -mt1">We are driven by humanistic values and strive for human welfare. Everything we do is in service for people and designed to work in ways to be easily understood and learned.</p>\
                        </div>\
                        <div class="principle principle__b">\
                            <p class="principle__title">Adaptable</p>\
                            <p class="principle__desc -font-light -mt1">As the environment changes we adapt to be at the forefront of knowledge and skills. We adapt to recognize new opportunities when something is ripe for improvement.</p>\
                        </div>\
                    </div>\
                    <div class="pillars-platform-col -col-4 -pl2 -pr2">\
                        <div class="pillars__platform -rel">\
                            <svg class="pillars__platform-svg -abs" preserveAspectRatio= "xMinYMin meet" viewBox="0 0 344 344">\
                                <polyline points="20,20 320,20 320,320 20,320 20,20" stroke="#DAE2E6" stroke-width="2" fill="transparent"></polyline>\
                                <line x1="20" y1="20" x2="320" y2="320" stroke="#DAE2E6" stroke-width="2"/>\
                                <line x1="20" y1="320" x2="320" y2="20" stroke="#DAE2E6" stroke-width="2"/>\
                                <circle cx="36" cy="36" r="34" stroke="url(#gradient-4b)" stroke-width="2" fill="#fff"></circle>\
                                <circle cx="308" cy="36" r="34" stroke="url(#gradient-4b)" stroke-width="2" fill="#fff"></circle>\
                                <circle cx="36" cy="308" r="34" stroke="url(#gradient-4b)" stroke-width="2" fill="#fff"></circle>\
                                <circle cx="308" cy="308" r="34" stroke="url(#gradient-4b)" stroke-width="2" fill="#fff"></circle>\
                            </svg>\
                            <p class="pillars__platform-svg-text -abs -ttu -color-bg-white -p1 -nw">We Support You</p>\
                        </div>\
                    </div>\
                    <div class="pillars-principle-col -col-4 -tal">\
                        <div class="principle principle__a">\
                            <p class="principle__title">Innovative</p>\
                            <p class="principle__desc -font-light -mt1">We promote a creative culture that prioritizes the introduction of new methodologies that lead to better solutions to the problems we face, achieving the goals that we set.</p>\
                        </div>\
                        <div class="principle principle__b">\
                            <p class="principle__title">Straightforward</p>\
                            <p class="principle__desc -font-light -mt1">We openly recognize when we make mistakes. We speak up when we believe something is not a good idea, a good fit or a good decision. We are also open about the good stuff. ;)</p>\
                        </div>\
                    </div>\
                </div>\
                <section class="about-us__testimonial -color-bg-neutral-xx-dark -color-white">\
                    <blockquote class="testimonial-blockquote -rel">\
                        <svg class="testimonial-quote -abs">\
                            <use xlink:href="#svg-quotes"></use>\
                        </svg>\
                        <p class="testimonial-text -rel -fsi -font-light">We have worked with dozens of agencies through the years and Empathia is by far the most creative, knowledgeable and responsive of all. They go above and beyond all expectations with their design and development skills. We’re extremely proud to be working with such an amazing, ethical and responsible team. I never hesitate to recommend their unique services, which have been a game-changer for us and I sincerely believe it is unmatched in the industry.</p>\
                        <footer class="-mt4">\
                            <cite class="testimonial-cite -fsn">\
                                Esra’a Al Shafei<br/>\
                                <span class="cite-sec -font-light -color-neutral-light">Mideast Youth Founder & Director</span>\
                            </cite>\
                        </footer>\
                    </blockquote>\
                </section>\
                <div class="about-us__team -tac">\
                    <h2 data-pleasure-text class="page__body-title -font-extra-light -noafter -m0">Pleasure To Meet You!</h2>\
                    <p class="font-medium-size -font-light">Our team is made of problem-solving designers, engineers, managers and business strategists but we’re also scientists, musicians, artists, travelers and athletes. We bring quality, culture and taste into what we do.</p>\
                </div>\
                <div class="about-us__team-gallery -row"></div>\
                <section class="work-with-us -tac">\
                    <h2 class="work-with-us__title -font-bold">So what’s your vision?</h2>\
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
            this._setup()._bindEvents();
        },

        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });

            this.headerWidget.activate();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.PageCover({
                name : 'headerWidget',
                data : {
                    subheading : 'About Us',
                    heading : 'We’re devoted to make the<br/>life of people easier & better.',
                    background : this.constructor.BG,
                    backgroundClassName : this.constructor.GRADIENT,
                    scrollInfo : 'Scroll down to learn why.'
                }
            })).render(this.element, this.element.firstElementChild);

            this.appendChild(new EM.UI.BottomPageLinks({
                name : 'links',
                views : [EM.Views.Carrers, EM.Views.Community]
            })).render(this.element);

            this.textGradient = new TextGradient(this.element.querySelector('[data-pillars-text]'), {
                from : CONSTANTS.COLORS.pink,
                to : CONSTANTS.COLORS.greypurple,
                direction : '225deg'
            });

            this.pleasureToMeetYou = new TextGradient(this.element.querySelector('[data-pleasure-text]'), {
                text : 'Pleasure To Meet You!',
                from : CONSTANTS.COLORS.pink,
                to : CONSTANTS.COLORS.greypurple,
                direction : '225deg'
            });

            this.appendChild(new EM.UI.GalleryManager({
                name : 'gallery',
                container : this.element.querySelector('.about-us__team-gallery'),
                data : teamData
            }));

            this.gallery.selectByIndex(0);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._projectPlannerBtnClickHandlerRef = this._projectPlannerBtnClickHandler.bind(this);
            Events.on(this.element.querySelector('[data-project-planner-btn]'), 'click', this._projectPlannerBtnClickHandlerRef);
            return this;
        },

        /* Dispatch a custom event `showProjectPlanner`, uses BubblingSupport to bubble up to App.
         * @method _projectPlannerBtnClickHandler <private>
         */
        _projectPlannerBtnClickHandler : function _projectPlannerBtnClickHandler() {
            this.dispatch('showProjectPlanner');
        },

        destroy : function destroy() {
            this.textGradient = this.textGradient.destroy();
            Events.off(this.element.querySelector('[data-project-planner-btn]'), 'click', this._projectPlannerBtnClickHandlerRef);
            this._projectPlannerBtnClickHandlerRef = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});

var CONSTANTS = require('./../lib/const');
var collageData = require('./../data/community/collage');

Class(EM.Views, 'Community').inherits(Widget).includes(BubblingSupport)({
    NAME : 'community',
    PATH : '/community',
    THUMB : '/img/views/community/thumb.jpg',
    BG : '/img/views/community/bg.jpg',
    GRADIENT : '-gradient-02',
    MENU_COLOR : CONSTANTS.COLORS.orange,
    TITLE : 'Community',
    SUBTITLE : 'We’re part of the ecosystem',

    ELEMENT_CLASS : 'page page-community',
    HTML : '\
        <section>\
            <div class="page__body">\
                <div class="page__intro-wrapper -color-bg-neutral-xx-light">\
                    <div class="page__intro -tac">\
                        <h2 class="page__body-title -font-bold">We Love This Town</h2>\
                        <p class="page__intro-text -font-light">And we love to see it grow with us. Guadalajara is becoming a strong technological and innovation hub. Potentially the biggest in the country and one of the most important in Latin America. There’s lots of talent pumped and hungry for doing new things and solve real problems. We believe that those of us who have had the opportunity to access and work with challenging cultures and markets around the world should be the ones who provide the guidance that newcomers need. So we’ve taken on a parallel mission to share all the knowledge and experience we have with the community.</p>\
                    </div>\
                </div>\
            </div>\
            <section class="communities -row">\
                <div class="community first -tac -col-6">\
                    <div class="community__logo" style="background-image: url(/img/views/community/communities/hackers-and-founders-logo.jpg);"></div>\
                    <p class="community__title -font-light">Hackers & Founders</p>\
                    <p class="community__url">www.hfgdl.com</p>\
                    <div class="community__content -mt3">\
                        <p class="-mb2">The Hackers & Founders community is huge with over 200,000 members in 104 cities around the world. Our mission is to make the lives of entrepreneurs suck less. The monthly meetups are events to learn about the ventures of other local entrepreneurs, pitch new ideas, network and find potential co-founders, team members and seed investment.</p>\
                        <p>However, in Guadalajara, we still need to up our game so we created and lead H/F chapters focused on UX and high level development in addition to the regular H/F meetups. Through these chapers called H/F UX and H/F ProDev, we host monthly events around the city focused on education to share with the community specialized knowledge that will help them accomplish their goals faster and with less risk.</p>\
                    </div>\
                </div>\
                <div class="community -tac -col-6">\
                    <div class="community__logo" style="background-image: url(/img/views/community/communities/startup-weekend-logo.jpg);"></div>\
                    <p class="community__title -font-light">Startup Weekend</p>\
                    <a href="http://www.swgdl.co/" target="_blank" class="community__url">www.swgdl.co</a>\
                    <div class="community__content -mt3">\
                        <p class="-mb2">Some of us have been mentors in Startup Weekend events since 2011 throughout the country. It is good and all but we felt that we had to make a bigger impact than just mentor.  In early 2014 we became part of the amazing organizing team and in that same year we launched the largest Startup Weekend ever with over 400 participants. Yeah, like the largest in the world.</p>\
                        <p>Now, in 2015 we plan to pull off the most ambitious Startup Weekend year. Usually these events happen once a year in a city but this is going to be a whole year of events all over the state closing with the largest Startup Weekend yet with over 800 participants. Startup Weekened World 2015.</p>\
                    </div>\
                </div>\
            </section>\
            <section class="collage -row"></section>\
            <section class="hop-on -tac">\
                <h2 class="hop-on__title -font-bold -mt0">Hop on!</h2>\
                <p class="hop-on__desc -font-light">If you want to help out or learn more about these efforts don’t hesitate and contact us or go to either of the communities’ sites! All help is greatly appreciated.</p>\
            </section>\
        </section>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.collageWrapper = this.element.querySelector('.collage');
            this._setup();
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
                    subheading : 'Community',
                    heading : 'Collaboration is the key to<br/>the betterment of societies.',
                    background : this.constructor.BG,
                    backgroundClassName : this.constructor.GRADIENT,
                    scrollInfo : 'Scroll down to learn how we help.'
                }
            })).render(this.element, this.element.firstElementChild);

            collageData.forEach(function(collage) {
                this.appendChild(EM.UI.Collage.create(collage)).render(this.collageWrapper);
            }, this);

            this.appendChild(new EM.UI.BottomPageLinks({
                name : 'links',
                views : [EM.Views.Journal, EM.Views.LetsTalk]
            })).render(this.element);
        }
    }
});

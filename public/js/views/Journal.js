var CONSTANTS = require('./../lib/const');
var postsData = require('./../data/journal/posts');

Class(EM.Views, 'Journal').inherits(Widget).includes(BubblingSupport)({
    NAME : 'journal',
    PATH : '/journal',
    THUMB : '/img/views/journal/thumb.jpg',
    BG : '/img/views/journal/bg.jpg',
    GRADIENT : '-gradient-03',
    MENU_COLOR : CONSTANTS.COLORS.pink,
    TITLE : 'Journal',
    SUBTITLE : 'Get into our mind',

    ELEMENT_CLASS : 'page page-journal',
    HTML : '\
        <section>\
            <article class="journal__menu"></article>\
            <section class="journal__posts -tac">\
                <svg class="-s32r -mt4 -color-neutral-dark">\
                    <use xlink:href="#svg-medium-icon"></use>\
                </svg>\
            </section>\
        </section>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.postsWrapper = this.element.querySelector('.journal__posts');
            this._setup();
        },

        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.PageCover({
                name : 'headerWidget',
                data : {
                    subheading : 'Journal',
                    heading : 'Past experiences are the<br/>source of knowledge.',
                    background : this.constructor.BG,
                    backgroundClassName : this.constructor.GRADIENT,
                    scrollInfo : 'Scroll down to get in our minds.'
                }
            })).render(this.element, this.element.firstElementChild);

            postsData.forEach(function(post) {
                this.appendChild(new EM.UI.JournalPost(post)).render(this.postsWrapper);
            }, this);

            this.appendChild(new EM.UI.BottomPageLinks({
                name : 'links',
                views : [EM.Views.LetsTalk]
            })).render(this.element);
        }
    }
});

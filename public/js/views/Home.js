var Events = require('./../lib/events');
var CONSTANTS = require('./../lib/const');
var isEventSupported = require('./../lib/utils/isEventSupported');
var hasTouchSupport = require('./../lib/utils/hasTouchSupport');
var slidesData = require('./../data/home/slides');

Class(EM.Views, 'Home').inherits(Widget).includes(BubblingSupport)({
    NAME : 'home',
    PATH : '/',
    THUMB : '/img/views/home/thumb.jpg',
    BKG: 'white',
    MENU_COLOR : CONSTANTS.COLORS.green,
    TITLE : 'Home',
    SUBTITLE : 'Home Subtitle',

    ELEMENT_CLASS : 'page page-home',
    HTML : [
      '<section>',
        '<h3 class="subheading -font-semi-bold">Hello! We\'re Empathia Agency</h3>',
        '<h1>Believe in a world where things work better.</h1>',
        '<p>An ideas and innovation firm that provides solutions rooted in technology, for the problems that affect the world.</p>',
        '<h3 class="featured -font-bold">Featured work</h3>',
        '<ul>',
          '<li>',
            '<h5 class="-font-semi-bold">crowdvoice.com</h5>',
            '<h3>Amplifying social justice movements worldwide.</h3>',
            '<a href="#">view case study</a>',
          '</li>',
          '<li>',
            '<h5 class="-font-semi-bold">crowdvoice.by</h5>',
            '<h3>Organize information about the causes that matter to you.</h3>',
            '<a href="#">view case study</a>',
          '</li>',
        '</ul>',
      '</section>'
    ].join(''),

    prototype : {
        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });
        }
    }
});

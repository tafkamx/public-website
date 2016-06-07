var Events = require('./../lib/events');
var CONSTANTS = require('./../lib/const');
var isEventSupported = require('./../lib/utils/isEventSupported');
var hasTouchSupport = require('./../lib/utils/hasTouchSupport');

var featured = [
  { title: 'crowdvoice.com', desc: 'Amplifying social justice movements worldwide.', url: '#' },
  { title: 'crowdvoice.by', desc: 'Organize information about the causes that matter to you.', url: '#' }
];

var journal = [
  { desc: 'Thoughts and lessons about breakups.', action: 'By <a href="#">Dario</a> in <a href="#">Misc</a>' },
  { desc: 'Working on a Sunday, making things better for people around the world! :) @ Empathia', action: '<a href="#">@EmpathiaAgency</a>' },
  { desc: 'Just a quick thought... abour our biggest challengue.', action: 'By <a href="#">Dario</a> in <a href="#">Misc</a>' },
  { desc: 'Instagram', action: '<a href="#">@EmpathiaAgency</a>', image: 'https://placeimg.com/260/260/tech' },
  { desc: 'Let\'s start with the why.', action: '<a href="#">@EmpathiaAgency</a>' }
];

Class(EM.Views, 'Home').inherits(Widget).includes(BubblingSupport)({
    NAME : 'home',
    PATH : '/',
    THUMB : '/img/views/home/thumb.jpg',
    BKG: 'white',
    MENU_COLOR : CONSTANTS.COLORS.white,
    TITLE : 'Home',
    SUBTITLE : 'Home Subtitle',

    ELEMENT_CLASS : 'page page-home',
    HTML : [
      '<section>',
        '<h3 class="subheading -font-semi-bold">Hello! We\'re Empathia Agency</h3>',
        '<h1>Believe in a world where things work better.</h1>',
        '<p>An ideas and innovation firm that provides solutions rooted in technology, for the problems that affect the world.</p>',
      '</section>'
    ].join(''),

    FEATURED_LIST_HTML: [
      '<h3 class="featured -font-bold">Featured work</h3>',
      '<ul class="featured__list">{items}</ul>'
    ].join(''),

    FEATURED_ITEM_HTML: [
      '<li>',
        '<h5 class="-font-semi-bold">{title}</h5>',
        '<h3>{desc}</h3>',
        '<a href="{url}">view case study</a>',
      '</li>',
    ].join(''),

    JOURNAL_LIST_HTML: [
      '<h2 class="featured -font-bold">Journal</h2>',
      '<ul class="journal__list">{items}</ul>'
    ].join(''),

    JOURNAL_ITEM_HTML: [
      '<li{background}><div class="bottom__aligned">',
        '<h3>{desc}</h3>',
        '{action}</div>',
      '</li>',
    ].join(''),

    prototype : {
        init: function init(config) {
          Widget.prototype.init.call(this, config);

          var $featured = this.constructor.FEATURED_LIST_HTML,
              $featured_item = this.constructor.FEATURED_ITEM_HTML;

          this.element.innerHTML += $featured.replace(/{items}/, featured.map(function(data) {
            return $featured_item
              .replace(/{title}/, data.title)
              .replace(/{desc}/, data.desc)
              .replace(/{url}/, data.url);
          }).join(''));

          if (!journal.length) {
            return;
          }

          var $journal = this.constructor.JOURNAL_LIST_HTML,
              $journal_item = this.constructor.JOURNAL_ITEM_HTML;

          this.element.innerHTML += $journal.replace(/{items}/, journal.map(function(data) {
            return $journal_item
              .replace(/{desc}/, data.desc)
              .replace(/{action}/, data.action)
              .replace(/{background}/, function() {
                if (data.image) {
                  return ' style="background-image:url(' + data.image + ')"';
                }

                return '';
              });
          }).join(''));
        },

        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });
        }
    }
});

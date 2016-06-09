var Events = require('./../lib/events');
var CONSTANTS = require('./../lib/const');
var isEventSupported = require('./../lib/utils/isEventSupported');
var hasTouchSupport = require('./../lib/utils/hasTouchSupport');

var featured = [
  { title: 'crowdvoice.com', desc: 'Amplifying social justice movements worldwide.', url: 'http://www.crowdvoice.org' },
  { title: 'crowdvoice.by', desc: 'Organize information about the causes that matter to you.', url: 'http://www.crowdvoice.by' }
];

var journal = [
  {
    desc: 'Thoughts and lessons about breakups.',
    action: 'By <a href="https://medium.empathia.agency/@cuiki">Dario Muñoz</a>',
    url: 'https://medium.empathia.agency/thoughts-and-lessons-about-breakups-d920ff3e0071',
    image: 'https://cdn-images-1.medium.com/max/1200/1*cYPGQsJBY-kWyXtlcB2dvg.jpeg'
  },
  {
    desc: 'Working on a Sunday, making things better for people around the world! :) @ Empathia',
    action: '<a href="https://twitter.com/EmpathiaAgency">@EmpathiaAgency</a>',
    url: 'https://twitter.com/EmpathiaAgency',
    image: 'background-image: https://scontent-ord1-1.cdninstagram.com/t51.2885-15/e35/12912421_852125868247545_1196979567_n.jpg'
  },
  {
    desc: 'Just a quick thought... abour our biggest challengue.',
    action: 'By <a href="https://medium.empathia.agency/@cuiki">Dario Muñoz</a>',
    url: 'https://medium.empathia.agency/thoughts-and-lessons-about-breakups-d920ff3e0071',
    image: 'https://cdn-images-1.medium.com/max/800/1*ExtPkqHqKR1S7yyBRYZWeA.jpeg'
  },
  {
    desc: 'Instagram',
    action: '<a href="https://www.instagram.com/empathia_agency">@EmpathiaAgency</a>',
    url: 'https://www.instagram.com/empathia_agency',
    image: 'https://scontent-ord1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13328963_945485648883979_892423652_n.jpg'
  },
  {
    desc: 'Let\'s start with the why.',
    action: 'By <a href="https://medium.empathia.agency/@cuiki">Dario Muñoz</a>',
    url: 'https://medium.empathia.agency/let-s-start-with-the-why-b3a2b444cbd5',
    image: 'https://cdn-images-1.medium.com/max/800/1*ww2Ha7rzHWBBNDlGW_WMMw.jpeg'
  }
];

Class(EM.Views, 'Home').inherits(Widget).includes(BubblingSupport)({
    NAME : 'home',
    PATH : '/',
    THUMB : '/img/views/home/thumb.jpg',
    GRADIENT: '-gradient-01',
    BG: '/img/views/home/slides/01.jpg',
    MENU_COLOR : CONSTANTS.COLORS.white,
    TITLE : 'Home',
    SUBTITLE : 'Home Subtitle',

    ELEMENT_CLASS : 'page page-home',
    HTML : [
      '<section>',
        '<div class="page__body">',
          '<div class="page__container -p5"></div>',
        '</div>',
      '</section>'
    ].join(''),

    FEATURED_LIST_HTML: [
      '<h2 class="featured -font-bold">Featured work</h2>',
      '<ul class="featured__list">{items}</ul>'
    ].join(''),

    FEATURED_ITEM_HTML: [
      '<li>',
        '<h5 class="-font-semi-bold">{title}</h5>',
        '<h3>{desc}</h3>',
        '<a href="{url}" class="-font-bold">visit project</a>',
      '</li>',
    ].join(''),

    JOURNAL_LIST_HTML: [
      '<h2 class="featured -font-bold">Journal</h2>',
      '<ul class="journal__list">{items}</ul>'
    ].join(''),

    JOURNAL_ITEM_HTML: [
      '<li{background}><div class="bottom__aligned">',
        '<h3><a href="{url}">{desc}</a></h3>',
        '{action}</div>',
      '</li>',
    ].join(''),

    prototype : {
        init: function init(config) {
          Widget.prototype.init.call(this, config);

          this.appendChild(new EM.UI.PageCover({
                name : 'headerWidget',
                data : {
                    subheading : 'Hello! We\'re Empathia Agency',
                    heading : 'Believe in a world where things work better.',
                    legend: 'An ideas and innovation firm that provides solutions rooted in technology, for the problems that affect the world.',
                    background : this.constructor.BG,
                    backgroundClassName : this.constructor.GRADIENT
                }
            })).render(null, this.element.firstElementChild);

          var $page = this.element.querySelector('.page__container');

          var $featured = this.constructor.FEATURED_LIST_HTML,
              $featured_item = this.constructor.FEATURED_ITEM_HTML;

          $page.innerHTML += $featured.replace(/{items}/, featured.map(function(data) {
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

          $page.innerHTML += $journal.replace(/{items}/, journal.map(function(data) {
            return $journal_item
              .replace(/{url}/, data.url)
              .replace(/{desc}/, data.desc)
              .replace(/{action}/, data.action)
              .replace(/{background}/, function() {
                if (data.image) {
                  return ' style="background-image:url(' + data.image + ')"';
                }

                return '';
              });
          }).join(''));

          return this;
        },

        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });
        }
    }
});

/* globals google */
var CONSTANTS = require('./../lib/const');
var Events = require('./../lib/events');
var moment = require('moment-timezone');
moment.tz.setDefault("America/Mexico_City");

Class(EM.Views, 'LetsTalk').inherits(Widget).includes(BubblingSupport)({
    NAME : 'lets-talk',
    PATH : '/lets-talk',
    THUMB : '/img/views/lets-talk/thumb.jpg',
    BG : '/img/views/lets-talk/bg.jpg',
    GRADIENT : '-gradient-04',
    MENU_COLOR : CONSTANTS.COLORS.purple,
    TITLE : 'Let’s Talk',
    SUBTITLE : 'Are you ready?',

    ELEMENT_CLASS : 'page page-lets-talk',
    HTML : '\
        <section>\
            <section class="work-with-us -tac">\
                <h2 class="work-with-us__title -font-bold -after-line">Do you have a new project in mind?</h2>\
                <p class="work-with-us__text -font-light">Great! Let’s get to know each other and discover what we can accomplish together.</p>\
                <p class="work-with-us__text -mb2 -font-light">Get started by filling out our project planner, it’ll help us have an informed conversation with you.</p>\
                <button data-project-planner-btn class="ui-btn -lg -purple -pl5 -pr5 -mb2">\
                    <span class="-rel">Project Planner</span>\
                </button>\
                <p class="work-with-us__small -font-light">Don’t feel like filling the form?</p>\
                <p class="work-with-us__small -font-light">Drop us a line at <a class="-link -purple" href="mailto:partners@empathya.agency" target="_blank">partners@empathya.agency</a>.</p>\
            </section>\
            <section class="other-things -row">\
                <div class="ot__col -col-4">\
                    <div class="ot__image -img-cover" style="background-image: url(/img/views/lets-talk/thumbs/empathia-book-speaker.jpg)"></div>\
                    <div class="ot__content -mt3">\
                        <h2 class="ot__title -mt0 -font-semi-bold">Book Speaker / Community</h2>\
                        <p class="ot__desc -color-neutral-dark">Thanks! We’re honored to share what we know with your audience. We’ve spoken at universities and conferences and we love it! Tell us how you’d like us to participate at <a class="-link -purple" href="mailto:community@empathya.agency" target="_blank">community@empathya.agency</a>.</p>\
                    </div>\
                </div>\
                <div class="ot__col -col-4">\
                    <div class="ot__image -img-cover" style="background-image: url(/img/views/lets-talk/thumbs/empathia-work-station.jpg)"></div>\
                    <div class="ot__content -mt3">\
                        <h2 class="ot__title -mt0 -font-semi-bold">Work at Empathia</h2>\
                        <p class="ot__desc -color-neutral-dark">We’re always looking to meet talented mission-driven people. If you know you can bring awesome things, then, for more information on how to apply for a position you should visit our Careers page.</p>\
                    </div>\
                </div>\
                <div class="ot__col -col-4">\
                    <div class="ot__image -img-cover" style="background-image: url(/img/views/lets-talk/thumbs/empathia-say-hi.jpg)"></div>\
                    <div class="ot__content -mt3">\
                        <h2 class="ot__title -mt0 -font-semi-bold">General Inquires / Say Hi</h2>\
                        <p class="ot__desc -color-neutral-dark">We’re a very friendly group of people so if you just want to say hello, ask a question or arrange to stop by to have a chat over beer or coffee then feel free to email us at <a class="-link -purple" href="mailto:hello@empathya.agency" target="_blank">hello@empathya.agency</a>.</p>\
                    </div>\
                </div>\
            </section>\
            <section class="location-grid -row">\
                <article class="location__item first -col-6 -full-height -rel">\
                    <h2 class="location-title -font-bold">Empathia</h2>\
                    <div class="contact-networks -mb3 -hide">\
                        <div class="contact-network -inline-block -mr1">\
                            <a href="https://medium.com" class="-block">\
                                <svg class="-s30r -color-white"><use xlink:href="#svg-medium-icon"></use></svg>\
                            </a>\
                        </div>\
                        <div class="contact-network -inline-block -mr1">\
                            <a href="https://twitter.com" class="-block">\
                                <svg class="-s30r -color-white"><use xlink:href="#svg-twitter-icon"></use></svg>\
                            </a>\
                        </div>\
                        <div class="contact-network -inline-block -mr1">\
                            <a href="https://facebook.com" class="-block">\
                                <svg class="-s30r -color-white"><use xlink:href="#svg-facebook-icon"></use></svg>\
                            </a>\
                        </div>\
                        <div class="contact-network -inline-block -mr1">\
                            <a href="https://dribbble.com" class="-block">\
                                <svg class="-s30r -color-white"><use xlink:href="#svg-dribbble-icon"></use></svg>\
                            </a>\
                        </div>\
                    </div>\
                    <p class="location-text -mb1">José Guadalupe Zuno 1745<br/>\
                    Colonia Americana, 44160<br/>\
                    Guadalajara, Mexico.</p>\
                    <p class="location-text">\
                        hello@empathya.agency<br/>\
                        <span class="-font-semi-bold">1 (414) 175.0283</span> (International)<br/>\
                        <span class="-font-semi-bold">52 (33) 1600.2769</span> (Mexico)\
                    </p>\
                    <div class="location-time -fsi">\
                        <svg class="location-time-svg -s16r -color-white">\
                            <use xlink:href="#svg-clock"></use>\
                        </svg>\
                        <p class="location-time-text -inline-block"></p>\
                    </div>\
                </article>\
                <article class="location__item -col-6 -full-height -rel">\
                    <div class="contact-map -abs -color-bg-neutral-xx-light"></div>\
                </article>\
            </section>\
        </section>',

    AVAILABLE_MSG : 'It’s <span class="-font-bold">{time}</span> in Guadalajara so we’re available for around {remainingTime} more {remainingTimeUnits}!',
    UNAVAILABLE_MSG : 'It’s <span class="-font-bold">{time}</span> in Guadalajara, we’re not available right now.',

    TIME_UPDATE : 60000,

    prototype : {
        _timer : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.localeTime = this.element.querySelector('.location-time-text');
            this._setup()._bindEvents();
        },

        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });

            this.headerWidget.activate();

            if (google && google.maps) {
                this._createMap();
            } else {
                google.maps.event.addDomListener(window, 'load', this._createMap.bind(this));
            }
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.PageCover({
                name : 'headerWidget',
                data : {
                    subheading : 'Let’s Talk',
                    heading : 'We can do awesome things<br/>together',
                    background : this.constructor.BG,
                    backgroundClassName : this.constructor.GRADIENT,
                    scrollInfo : 'Scroll down and let us know what you’re looking for.'
                }
            })).render(this.element, this.element.firstElementChild);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._projectPlannerBtnClickHandlerRef = this._projectPlannerBtnClickHandler.bind(this);
            Events.on(this.element.querySelector('[data-project-planner-btn]'), 'click', this._projectPlannerBtnClickHandlerRef);

            this._updateLocaleTimeRef = this._updateLocaleTime.bind(this);
            this._updateLocaleTime();
            return this;
        },

        _updateLocaleTime : function _updateLocaleTime() {
            if (this._timer) {
                window.clearTimeout(this._timer);
            }

            this._timer = window.setTimeout(this._updateLocaleTimeRef, this.constructor.TIME_UPDATE);

            var m = moment();
            var hour = m.format('hh:mm a');
            var a = m.format('YYYY-MM-DD') + ' 09:00:00';
            var b = m.format('YYYY-MM-DD') + ' 18:00:00';

            this.localeTime.innerHTML = '';

            if (m.isBetween(a,b)) {
                var remainHours = moment(b).diff(m,'hours');
                var text = this.constructor.AVAILABLE_MSG.replace(/{time}/, hour);

                if (remainHours) {
                    text = text.replace(/{remainingTime}/, remainHours);
                    text = text.replace(/{remainingTimeUnits}/, 'hours');
                } else {
                    var remainMins = moment(b).diff(m,'minutes');
                    text = text.replace(/{remainingTime}/, remainMins);
                    text = text.replace(/{remainingTimeUnits}/, 'minutes');
                }

                this.localeTime.insertAdjacentHTML('beforeend', text);
                return;
            }

            this.localeTime.insertAdjacentHTML('beforeend', this.constructor.UNAVAILABLE_MSG.replace(/{time}/, hour));
        },

        /* Dispatch a custom event `showProjectPlanner`, uses BubblingSupport to bubble up to App.
         * @method _projectPlannerBtnClickHandler <private>
         */
        _projectPlannerBtnClickHandler : function _projectPlannerBtnClickHandler() {
            this.dispatch('showProjectPlanner');
        },

        _createMap : function _createMap() {
            var mapCanvas = this.element.querySelector('.contact-map');
            var mapOptions = {
                center: {lat: 20.6697775, lng: -103.3635804},
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            };
            this._map = new google.maps.Map(mapCanvas, mapOptions);

            var image = '/img/views/lets-talk/location/pin.png';
            this._beachMarker = new google.maps.Marker({
                position: {lat: 20.6697775, lng: -103.3635804},
                map: this._map,
                icon: image
            });
        },

        destroy : function destroy() {
            window.clearTimeout(this._timer);
            Events.off(this.element.querySelector('[data-project-planner-btn]'), 'click', this._projectPlannerBtnClickHandlerRef);
            this._projectPlannerBtnClickHandlerRef = null;
            this._map = null;
            this._beachMarker = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});

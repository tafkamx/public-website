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
            <section class="work-with-us page__container -tac">\
                <h2 class="work-with-us__title -font-bold -after-line">Do you have a new project in mind?</h2>\
                <p class="work-with-us__text -font-light">Great! Let’s get to know each other and discover what we can accomplish together.</p>\
                <p class="work-with-us__text -mb2 -font-light">Get started by filling out our project planner, it’ll help us have an informed conversation with you.</p>\
                <button data-project-planner-btn class="ui-btn -lg -purple -pl5 -pr5 -mb2">\
                    <span class="-rel">Project Planner</span>\
                </button>\
                <p class="work-with-us__small -font-light">Don’t feel like filling the form?</p>\
                <p class="work-with-us__small -font-light">Drop us a line at <a class="-link -purple" href="mailto:partners@empathia.agency">partners@empathia.agency</a>.</p>\
            </section>\
            <section class="other-things page__container -row">\
                <div class="ot__col -col-4">\
                    <div class="ot__image -img-cover" style="background-image: url(/img/views/lets-talk/thumbs/empathia-book-speaker.jpg)"></div>\
                    <div class="ot__content -mt3">\
                        <h2 class="ot__title -mt0 -font-semi-bold">Book Speaker / Community</h2>\
                        <p class="ot__desc -color-neutral-dark">Thanks! We’re honored to share what we know with your audience. We’ve spoken at universities and conferences and we love it! Tell us how you’d like us to participate at <a class="-link -purple" href="mailto:community@empathia.agency">community@empathia.agency</a>.</p>\
                    </div>\
                </div>\
                <div class="ot__col -col-4">\
                    <div class="ot__image -img-cover" style="background-image: url(/img/views/lets-talk/thumbs/empathia-work-station.jpg)"></div>\
                    <div class="ot__content -mt3">\
                        <h2 class="ot__title -mt0 -font-semi-bold">Work at Empathia</h2>\
                        <p class="ot__desc -color-neutral-dark">We’re always looking to meet talented mission-driven people. If you know you can bring awesome things, then, for more information on how to apply for a position you should visit our <a data-careers-btn class="-link -purple" href="careers" onclick="return false">Careers page.</a></p>\
                    </div>\
                </div>\
                <div class="ot__col -col-4">\
                    <div class="ot__image -img-cover" style="background-image: url(/img/views/lets-talk/thumbs/empathia-say-hi.jpg)"></div>\
                    <div class="ot__content -mt3">\
                        <h2 class="ot__title -mt0 -font-semi-bold">General Inquires / Say Hi</h2>\
                        <p class="ot__desc -color-neutral-dark">We’re a very friendly group of people so if you just want to say hello, ask a question or arrange to stop by to have a chat over beer or coffee then feel free to email us at <a class="-link -purple" href="mailto:hello@empathia.agency">hello@empathia.agency</a>.</p>\
                    </div>\
                </div>\
            </section>\
            <section class="location-grid -row">\
                <article class="location__item first -col-6 -full-height -rel">\
                    <h2 class="location-title -font-bold">Empathia</h2>\
                    <div class="contact-networks -mb3">\
                        <div class="contact-network -inline-block -mr1 -hide">\
                            <a href="https://medium.com/@EmpathiaAgency" class="-block" target="_blank">\
                                <svg class="-s30r -color-white"><use xlink:href="#svg-medium-icon"></use></svg>\
                            </a>\
                        </div>\
                        <div class="contact-network -inline-block -mr1">\
                            <a href="https://twitter.com/EmpathiaAgency" class="-block" target="_blank">\
                                <svg class="-s30r -color-white"><use xlink:href="#svg-twitter-icon"></use></svg>\
                            </a>\
                        </div>\
                        <div class="contact-network -inline-block -mr1">\
                            <a href="https://www.facebook.com/EmpathiaAgency" class="-block" target="_blank">\
                                <svg class="-s30r -color-white"><use xlink:href="#svg-facebook-icon"></use></svg>\
                            </a>\
                        </div>\
                        <div class="contact-network -inline-block -mr1">\
                            <a href="https://dribbble.com/EmpathiaAgency" class="-block" target="_blank">\
                                <svg class="-s30r -color-white"><use xlink:href="#svg-dribbble-icon"></use></svg>\
                            </a>\
                        </div>\
                    </div>\
                    <p class="location-text -mb1">José Guadalupe Zuno 1745<br/>\
                    Colonia Americana, 44160<br/>\
                    Guadalajara, Mexico.</p>\
                    <p class="location-text">\
                        <a class="-link -white" href="mailto:hello@empathia.agency">hello@empathia.agency</a><br/>\
                        <span class="-font-semi-bold">52 (33) 1600.2769</span>\
                    </p>\
                    <div class="location-time -fsi">\
                        <svg class="location-time-svg -abs -s16r -color-white">\
                            <use xlink:href="#svg-clock"></use>\
                        </svg>\
                        <p class="location-time-text -inline-block -ml2"></p>\
                    </div>\
                </article>\
                <article class="location__item -col-6 -full-height -rel">\
                    <div class="contact-map -abs "></div>\
                </article>\
            </section>\
        </section>',

    AVAILABLE_MSG : 'It’s <span class="-font-bold">{time}</span> in Guadalajara so we’re available for around {remainingTime} more {remainingTimeUnits}!',
    UNAVAILABLE_MSG : 'It’s {day} at <span class="-font-bold">{time}</span> in Guadalajara, so we’ll be available in about {remainingTime} more {remainingTimeUnits}!',
    WEEKEND_MSG : 'It’s {day} at <span class="-font-bold">{time}</span> in Guadalajara. We’ll available in about {remainingTime} more {remainingTimeUnits}!',

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

            this._careersBtnClickHandlerRef = this._careersBtnClickHandle.bind(this);
            Events.on(this.element.querySelector('[data-careers-btn]'),'click', this._careersBtnClickHandlerRef);

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
            this.localeTime.innerHTML = '';

            // weekend
            if (m.isoWeekday() === 6 || m.isoWeekday() === 7) {
                return this.__updateLocaleTimeWeekend(m);
            }

            var a = m.format('YYYY-MM-DD') + ' 09:00:00';
            var b = m.format('YYYY-MM-DD') + ' 18:00:00';
            // available
            if (m.isBetween(a,b)) {
                return this.__updateLocaleTimeAvailable(m, b);
            }

            // unavailable, friday
            if (m.isoWeekday() === 5) {
                return this.__updateLocaleTimeUnavailableFriday(m);
            }

            // unavailable
            return this.__updateLocaleTimeUnavailable(m, a, b);
        },

        __updateLocaleTimeAvailable : function __updateLocaleTimeAvailable(m, b) {
            var text = this.constructor.AVAILABLE_MSG.replace(/{time}/, m.format('h:mm a'));
            var remainHours = moment(b).diff(m,'hours');

            if (remainHours) {
                text = text.replace(/{remainingTime}/, remainHours);
                text = text.replace(/{remainingTimeUnits}/, 'hours');
            } else {
                var remainMins = moment(b).diff(m,'minutes');
                text = text.replace(/{remainingTime}/, remainMins);
                text = text.replace(/{remainingTimeUnits}/, 'minutes');
            }

            this.localeTime.insertAdjacentHTML('beforeend', text);
        },

        __updateLocaleTimeUnavailableFriday : function __updateLocaleTimeUnavailableFriday(m) {
            var monday = moment().add(3,'day').format('YYYY-MM-DD') + ' 09:00:00';
            var remainHours = moment(monday).diff(m, 'hours');
            var text = this.constructor.UNAVAILABLE_MSG.replace(/{day}/, m.format('dddd'));
            text = text.replace(/{time}/, m.format('h:mm a'));
            text = text.replace(/{remainingTime}/, remainHours);
            text = text.replace(/{remainingTimeUnits}/, 'hours');

            this.localeTime.insertAdjacentHTML('beforeend', text);
        },

        __updateLocaleTimeUnavailable : function __updateLocaleTimeUnavailable(m, a, b) {
            var text = this.constructor.UNAVAILABLE_MSG.replace(/{day}/, m.format('dddd'));
            text = text.replace(/{time}/, m.format('h:mm a'));
            var remainHours, remainMins;

            if (m.isBefore(a)) {
                remainHours = moment(a).diff(m, 'hours');
                if (remainHours) {
                    text = text.replace(/{remainingTime}/, remainHours);
                    text = text.replace(/{remainingTimeUnits}/, 'hours');
                } else {
                    remainMins = moment(a).diff(m,'minutes');
                    text = text.replace(/{remainingTime}/, remainMins);
                    text = text.replace(/{remainingTimeUnits}/, 'minutes');
                }
            } else if (m.isAfter(b)) {
                var tomorrow = moment().add(1,'day').format('YYYY-MM-DD') + ' 09:00:00';
                remainHours = moment(tomorrow).diff(m,'hours');
                if (remainHours) {
                    text = text.replace(/{remainingTime}/, remainHours);
                    text = text.replace(/{remainingTimeUnits}/, 'hours');
                } else {
                    remainMins = moment(tomorrow).diff(m,'minutes');
                    text = text.replace(/{remainingTime}/, remainMins);
                    text = text.replace(/{remainingTimeUnits}/, 'minutes');
                }
            }

            this.localeTime.insertAdjacentHTML('beforeend', text);
        },

        __updateLocaleTimeWeekend : function __updateLocaleTimeWeekend(m) {
            var monday;
            if (m.isoWeekday() === 6) {
                monday = moment().add(2,'day').format('YYYY-MM-DD') + ' 09:00:00';
            } else if (m.isoWeekday() === 7) {
                monday = moment().add(1, 'day').format('YYYY-MM-DD') + ' 09:00:00';
            }
            var remainHours = moment(monday).diff(m,'hours');
            var text = this.constructor.WEEKEND_MSG.replace(/{day}/, m.format('dddd'));
            text = text.replace(/{time}/, m.format('h:mm a'));

            if (remainHours) {
                text = text.replace(/{remainingTime}/, remainHours);
                text = text.replace(/{remainingTimeUnits}/, 'hours');
            } else {
                var remainMins = moment(monday).diff(m,'minutes');
                text = text.replace(/{remainingTime}/, remainMins);
                text = text.replace(/{remainingTimeUnits}/, 'minutes');
            }

            this.localeTime.insertAdjacentHTML('beforeend', text);
        },

        /* Dispatch a custom event `showProjectPlanner`, uses BubblingSupport to bubble up to App.
         * @method _projectPlannerBtnClickHandler <private>
         */
        _projectPlannerBtnClickHandler : function _projectPlannerBtnClickHandler() {
            this.dispatch('showProjectPlanner');
        },
        _careersBtnClickHandle : function _projectPlannerBtnClickHandler(){
            this.dispatch('updateRoute', {
                route: '/careers'
            });
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
            google.maps.event.addListenerOnce(this._map, 'tilesloaded', function(){
                mapCanvas.style.backgroundImage = 'none';
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

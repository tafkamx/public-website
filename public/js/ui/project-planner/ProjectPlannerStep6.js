var Events = require('./../../lib/events');

Class(EM.UI, 'ProjectPlannerStep6').inherits(Widget).includes(BubblingSupport)({
    NAME : 'step6',
    ELEMENT_CLASS : 'forms__step',
    HTML : '\
        <div>\
            <div class="page__container -rel -tac">\
                <p class="project-planner__title -font-semi-bold">Thanks for taking the time to submit this!</p>\
                <p class="project-planner__desc -pb5">We will get back to you as soon as possible. In the meantime you can read our Journal to get to know us a bit better.</p>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.Button({
                name : 'button',
                className : '-md -pink -pl3 -pr3',
                text : 'Get In Our Minds'
            })).render(this.element.querySelector('.page__container'));
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._clickHandlerRef = this._clickHandler.bind(this);
            Events.on(this.button.element, 'click', this._clickHandlerRef);
        },

        _clickHandler : function _clickHandler() {
            this.dispatch('updateRoute', {
                route: '/journal'
            });

            this.parent.destroy();
        },

        destroy : function destroy() {
            Events.off(this.button.element, 'click', this._clickHandlerRef);
            this._clickHandlerRef = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});

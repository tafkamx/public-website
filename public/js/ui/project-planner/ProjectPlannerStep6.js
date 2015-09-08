var Events = require('./../../lib/events');

Class(EM.UI, 'ProjectPlannerStep6').inherits(Widget)({
    NAME : 'step6',
    ELEMENT_CLASS : 'project-planner__step',
    HTML : '\
        <div>\
            <div class="project-planner__step-counter">&nbsp;</div>\
            <p class="project-planner__title -font-light">Thank you taking the time to submit this!</p>\
            <p class="project-planner__desc -pb5">We will get back to as soon as possible. In the mean time you can read our Journal to get to know us a bit better.</p>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.Button({
                name : 'button',
                className : '-md -pink -pl5 -pr5 -mb1',
                text : 'Over and out'
            })).render(this.element);
            return this;
        },

        _bindEvents : function _bindEvents() {
            Events.on(this.button.element, 'click', function() {
                this.parent.deactivate();
            }.bind(this));
        }
    }
});

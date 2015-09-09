var CONSTANTS = require('./../lib/const');
var Events = require('./../lib/events');
var onTransitionEnd = require('./../lib/onTransitionEnd');
var ProjectPlannerData = require('./../data/project-planner/registry');

Class(EM.Views, 'ProjectPlanner').inherits(Widget).includes(BubblingSupport)({
    // NAME : 'project-planner',
    PATH : '/project-planner',
    MENU_COLOR : CONSTANTS.COLORS.purple,
    ELEMENT_CLASS : 'project-planner -color-bg-white -fix',
    HTML : '\
        <div>\
            <svg class="project-planner__close -s22r -abs -clickable">\
                <use xlink:href="#svg-close"></use>\
            </svg>\
            <div class="project-planner__inner"></div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.inner = this.element.querySelector('.project-planner__inner');
            this._setup()._bindEvents();
        },

        setup : function setup() {
            this.showStep(EM.UI.ProjectPlannerStep1.NAME);
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.ProjectPlannerStep1({
                name: EM.UI.ProjectPlannerStep1.NAME
            })).render(this.inner);

            this.appendChild(new EM.UI.ProjectPlannerStep2({
                name: EM.UI.ProjectPlannerStep2.NAME
            })).render(this.inner);

            this.appendChild(new EM.UI.ProjectPlannerStep3({
                name: EM.UI.ProjectPlannerStep3.NAME
            })).render(this.inner);

            this.appendChild(new EM.UI.ProjectPlannerStep4({
                name: EM.UI.ProjectPlannerStep4.NAME
            })).render(this.inner);

            this.appendChild(new EM.UI.ProjectPlannerStep5({
                name: EM.UI.ProjectPlannerStep5.NAME
            })).render(this.inner);

            this.appendChild(new EM.UI.ProjectPlannerStep6({
                name: EM.UI.ProjectPlannerStep6.NAME
            })).render(this.inner);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this._deactivateRef = this._deactivate.bind(this);
            Events.on(this.element.querySelector('.project-planner__close'), 'click', this._deactivateRef);

            this._showStepRef = this._showStep.bind(this);
            this.bind('showPage', this._showStepRef);

            this._setDataRef = this._setData.bind(this);
            this.bind('setData', this._setDataRef);
        },

        _showStep : function _showStep(ev) {
            ev.stopPropagation();

            if (this[ev.name]) {
                this.showStep(ev.name);
            }
        },

        showStep : function showStep(stepName) {
            this.children.forEach(function(child) {
                child.deactivate();
            });

            this[stepName].activate();
        },

        _setData : function _setData(ev) {
            ev.stopPropagation();

            console.log(ev.data);

            ev.data.forEach(function(data) {
                ProjectPlannerData.set(data.prop, data.value);
            });

            console.log(ProjectPlannerData);
        },

        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);

            this.dispatch('projectPlanner:closed');

            onTransitionEnd(this.element, function() {
                this.destroy();
            }.bind(this));
        }
    }
});

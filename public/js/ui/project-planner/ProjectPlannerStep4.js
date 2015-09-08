var Events = require('./../../lib/events');

Class(EM.UI, 'ProjectPlannerStep4').inherits(Widget).includes(BubblingSupport)({
    NAME : 'step4',
    ELEMENT_CLASS : 'project-planner__step',
    HTML : '\
        <div data-step="budget-selector">\
            <div class="project-planner__step-counter">4<span class="dim">/5</span></div>\
            <p class="project-planner__title -font-light">What about a budget?</p>\
            <p class="project-planner__desc">If you do, please give us a rough idea. Our work is based on coming up with solutions within constraints. A budget is one of these constraints. Knowing it willl help us to maximize the available resources to achieve the best solution possible.</p>\
            <div class="project-planner__budget-radios -pt3 -pb5">\
                <label class="-clickable">\
                    <input type="radio" name="has-budget" value="1" checked/> Of course my horse\
                </label>\
                <label class="-clickable">\
                    <input type="radio" name="has-budget" value="0"/> No! I need help planning\
                </label>\
            </div>\
            <div class="project-planner__budget-selector-range -rel"></div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.radioElements = [].slice.call(this.element.querySelectorAll('[name="has-budget"]'),0);
            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.RangeSelector({
                name : 'rangeSelector',
                initialValue: 50,
                onChange: this._changeProjectData.bind(this),
            }).render(this.element.querySelector('.project-planner__budget-selector-range')));

            this.appendChild(new EM.UI.Button({
                name : 'button',
                className : '-md -neutral-dark -pl5 -pr5 -mb1',
                html : 'Next&nbsp;&nbsp;›'
            })).render(this.element);
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._radioChangeRef = this._radioChange.bind(this);
            this.radioElements.forEach(function(radio) {
                Events.on(radio, 'change', this._radioChangeRef);
            }, this);

            this._buttonClickHandlerRef = this._buttonClickHandler.bind(this);
            Events.on(this.button.element, 'click', this._buttonClickHandlerRef);
        },

        _radioChange : function _radioChange(ev) {
            if (ev.currentTarget.value === "0") {
                return this.rangeSelector.disable();
            }

            this.rangeSelector.enable();
        },

        _buttonClickHandler : function _buttonClickHandler() {
            var data = [
                {prop: 'budgetGiven', value: this.radioElements[0].checked},
                {prop: 'budgetRangeSliderValue', value : this.rangeSelector.getValue()},
                {prop: 'budgetValue', value : this.rangeSelector.getBudgetRange()}
            ];
            this.dispatch('setData', {data : data});
            this.dispatch('showPage', {name: EM.UI.ProjectPlannerStep5.NAME});
        },

        _changeProjectData: function(element) {
            console.log(element.value);
        },

        destroy : function destroy() {
            Events.off(this.button.element, 'click', this._buttonClickHandlerRef);
            this._buttonClickHandlerRef = null;

            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});

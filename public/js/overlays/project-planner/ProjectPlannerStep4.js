var Events = require('./../../lib/events');

Class(EM.UI, 'ProjectPlannerStep4').inherits(Widget).includes(BubblingSupport)({
    NAME : 'step4',
    ELEMENT_CLASS : 'overlay-form__container',
    HTML : '\
        <div>\
            <div class="-oa -full-height">\
                <div class="overlay-form-info-wrapper">\
                    <div class="page__container overlay-form-info-inner -rel">\
                        <div class="project-planner__step-counter -grad-04">4/5</div>\
                        <p class="overlay__title -font-semi-bold">What about a budget?</p>\
                        <p class="overlay__desc">If you do, please give us a rough idea. Our work is based on coming up with solutions within constraints. A budget is one of these constraints. Knowing it will help us to maximize the available resources to achieve the best solution possible.</p>\
                        <div class="project-planner__budget-radios -pt3 -pb5">\
                            <label class="-clickable">\
                                <input type="radio" name="has-budget" value="1" checked/>\
                                <span>Of course my horse</span>\
                            </label>\
                            <label class="-clickable">\
                                <input type="radio" name="has-budget" value="0"/>\
                                <span>No! I need help planning</span>\
                            </label>\
                        </div>\
                        <div class="project-planner__budget-selector-range -rel"></div>\
                    </div>\
                </div>\
            </div>\
            <div class="overlay-form__footer">\
                <div class="overlay-form-inner -rel">\
                    <div class="-row">\
                        <div data-back-btn-container class="-col-6"></div>\
                        <div data-next-btn-container class="-col-6 -tar"></div>\
                    </div>\
                </div>\
            </div>\
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
                initialValue: 50
            }).render(this.element.querySelector('.project-planner__budget-selector-range')));

            this.appendChild(new EM.UI.Button({
                name : 'backButton',
                className : '-mini -gray -pl2 -pr2 -mt1',
                html : '‹&nbsp;Back'
            })).render(this.element.querySelector('[data-back-btn-container]'));

            this.appendChild(new EM.UI.Button({
                name : 'nextButton',
                className : '-md -neutral-dark -pl4 -pr4',
                html : 'Next&nbsp;&nbsp;›'
            })).render(this.element.querySelector('[data-next-btn-container]'));
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._radioChangeRef = this._radioChange.bind(this);
            this.radioElements.forEach(function(radio) {
                Events.on(radio, 'change', this._radioChangeRef);
            }, this);

            this._backButtonClickHandlerRef = this._backButtonClickHandler.bind(this);
            Events.on(this.backButton.element, 'click', this._backButtonClickHandlerRef);

            this._nextButtonClickHandlerRef = this._nextButtonClickHandler.bind(this);
            Events.on(this.nextButton.element, 'click', this._nextButtonClickHandlerRef);
        },

        _radioChange : function _radioChange(ev) {
            if (ev.currentTarget.value === "0") {
                return this.rangeSelector.disable();
            }

            this.rangeSelector.enable();
        },

        _backButtonClickHandler : function _backButtonClickHandler() {
            this.dispatch('showPage', {name: EM.UI.ProjectPlannerStep3.NAME});
        },

        _nextButtonClickHandler : function _nextButtonClickHandler() {
            var data = [
                {prop: 'budgetGiven', value: this.radioElements[0].checked},
                {prop: 'budgetRangeSliderValue', value : this.rangeSelector.getValue()},
                {prop: 'budgetValue', value : this.rangeSelector.getBudgetRange()}
            ];
            this.dispatch('setData', {data : data});
            this.dispatch('showPage', {name: EM.UI.ProjectPlannerStep5.NAME});
        },

        destroy : function destroy() {
            Events.off(this.backButton.element, 'click', this._backButtonClickHandlerRef);
            this._backButtonClickHandlerRef = null;

            Events.off(this.nextButton.element, 'click', this._nextButtonClickHandlerRef);
            this._nextButtonClickHandlerRef = null;

            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});

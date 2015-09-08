/* globals EM, BubblingSupport */
var CONSTANTS = require('./../lib/const');
var Events = require('./../lib/events');

Class(EM.Views, 'CaseStudies').inherits(Widget).includes(BubblingSupport)({
    NAME : 'case-studies',
    PATH : '/case-studies',
    THUMB : '/img/views/case-studies/thumb.jpg',
    BG : '/img/views/case-studies/cover-image.jpg',
    GRADIENT : '-gradient-02',
    MENU_COLOR: CONSTANTS.COLORS.orange,
    TITLE : 'Case Studies',
    SUBTITLE : 'View our latests case studies',

    ELEMENT_CLASS : 'page page-case-studies',
    HTML : '\
        <section>\
            <div class="page__body">\
                <div class="case-studies__proyects">\
                    <article class="case-studies__proyect -tac -rel">\
                        <div class="case-studies__proyect-bg -img-cover -abs -abs-after" style="background-image: url(/img/views/case-studies/projects/crowdvoice-by-app.jpg)"></div>\
                        <div class="case-studies__proyect-info -tac -rel">\
                            <h2 class="case-studies__proyect-title -font-bold">CrowdVoice.by</h2>\
                            <p class="case-studies__proyect-desc -font-light">Broadcast and visualize messages, raise awareness and invite change.</p>\
                        </div>\
                    </article>\
                    <article class="case-studies__proyect -tac -rel">\
                        <div class="case-studies__proyect-bg -img-cover -abs -abs-after" style="background-image: url(/img/views/case-studies/projects/patos-app.jpg)"></div>\
                        <div class="case-studies__proyect-info -tac -rel">\
                            <h2 class="case-studies__proyect-title -font-bold">Pat OS</h2>\
                            <p class="case-studies__proyect-desc -font-light">Private tutoring scheduling and management made easy.</p>\
                        </div>\
                    </article>\
                    <article class="case-studies__proyect -tac -rel">\
                        <div class="case-studies__proyect-bg -img-cover -abs -abs-after" style="background-image: url(/img/views/case-studies/projects/crowdvoice-org-app.jpg)"></div>\
                        <div class="case-studies__proyect-info -tac -rel">\
                            <h2 class="case-studies__proyect-title -font-bold">CrowdVoice.org</h2>\
                            <p class="case-studies__proyect-desc -font-light">Amplifying social justice movements worldwide.</p>\
                        </div>\
                    </article>\
                </div>\
                <section class="work-with-us -tac">\
                    <h2 class="work-with-us__title -font-bold -mb1 -after-line">So what’s your vision?</h2>\
                    <p class="work-with-us__text -font-light">Let’s talk to get to know each other and discover what we can accomplish together.</p>\
                    <p class="work-with-us__text -mb3 -font-light">Get started by filling out our brief form, it’ll help us have an informed conversation with you.</p>\
                    <button data-project-planner-btn class="ui-btn -lg -pink -pl5 -pr5 -mb2">Project Planner</button>\
                    <p class="work-with-us__small -font-light">Don’t feel like filling the form?</p>\
                    <p class="work-with-us__small -font-light">Drop us a line at newbusiness@empathya.agency.</p>\
                </section>\
            </div>\
        </section>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup()._bindEvents();
        },

        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.PageCover({
                name : 'headerWidget',
                data : {
                    subheading : 'Case Studies',
                    heading : 'The proof of what<br/>we believe in.',
                    background : this.constructor.BG,
                    backgroundClassName : this.constructor.GRADIENT,
                    scrollInfo : 'Scroll down to view the case studies.'
                }
            })).render(this.element, this.element.firstElementChild);

            this.appendChild(new EM.UI.BottomPageLinks({
                name : 'links',
                views : [EM.Views.WhatWeDo, EM.Views.AboutUs]
            })).render(this.element);
            return this;
        },

        _bindEvents : function _bindEvents() {
            this._projectPlannerBtnClickHandlerRef = this._projectPlannerBtnClickHandler.bind(this);
            Events.on(this.element.querySelector('[data-project-planner-btn]'), 'click', this._projectPlannerBtnClickHandlerRef);
            return this;
        },

        /* Dispatch a custom event `showProjectPlanner`, uses BubblingSupport to bubble up to App.
         * @method _projectPlannerBtnClickHandler <private>
         */
        _projectPlannerBtnClickHandler : function _projectPlannerBtnClickHandler() {
            this.dispatch('showProjectPlanner');
        },

        destroy : function destroy() {
            Events.off(this.element.querySelector('[data-project-planner-btn]'), 'click', this._projectPlannerBtnClickHandlerRef);
            this._projectPlannerBtnClickHandlerRef = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});

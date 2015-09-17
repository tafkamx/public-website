var ProjectsData = require('./../data/case-studies/projects');
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
                <div class="page__container">\
                    <div class="case-studies__proyects"></div>\
                    <section class="work-with-us -tac">\
                        <h2 class="work-with-us__title -font-bold -mb1 -after-line">So what’s your vision?</h2>\
                        <p class="work-with-us__text -font-light">Let’s talk to get to know each other and discover what we can accomplish together.</p>\
                        <p class="work-with-us__text -mb3 -font-light">Get started by filling out our brief form, it’ll help us have an informed conversation with you.</p>\
                        <button data-project-planner-btn class="ui-btn -lg -orange -pl5 -pr5 -mb2">\
                            <span class="-rel">Project Planner</span>\
                        </button>\
                        <p class="work-with-us__small -font-light">Don’t feel like filling the form?</p>\
                        <p class="work-with-us__small -font-light">Drop us a line at <a class="-link -orange" href="mailto:partners@empathya.agency" target="_blank">partners@empathya.agency</a>.</p>\
                    </section>\
                </div>\
            </div>\
        </section>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.projectsWrapper = this.element.querySelector('.case-studies__proyects');
            this._setup()._bindEvents();
        },

        setup : function setup() {
            this.dispatch('changeMenuColor', {
                color : this.constructor.MENU_COLOR
            });

            this.headerWidget.activate();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.PageCover({
                name : 'headerWidget',
                data : {
                    subheading : 'Work',
                    heading : 'The proof of what<br/>we believe in.',
                    background : this.constructor.BG,
                    backgroundClassName : this.constructor.GRADIENT,
                    scrollInfo : 'Scroll down to view the work.'
                }
            })).render(this.element, this.element.firstElementChild);

            ProjectsData.forEach(function(project, index) {
                this.appendChild(new EM.UI.CaseStudy({
                    name : 'case_study_' + index,
                    data : project
                })).render(this.projectsWrapper);
            }, this);

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

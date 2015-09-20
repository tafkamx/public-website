var GeminiScrollbar = require('gemini-scrollbar');
var Events = require('./../lib/events');
var CONSTANTS = require('./../lib/const');

Class(EM.UI, 'Grid').inherits(Widget).includes(BubblingSupport)({
    ELEMENT_CLASS : 'grid -abs',
    HTML : '\
        <div>\
            <div class="grid__bg-image -abs -full-width -full-height -img-cover"></div>\
            <div class="grid__inner -full-height">\
                <div class="gm-scrollbar -vertical"><span class="thumb"></span></div>\
                <div class="gm-scrollbar -horizontal"><span class="thumb"></span></div>\
                <div class="gm-scroll-view -full-height">\
                    <div class="grid__list -tac"></div>\
                    <footer class="grid__footer -pb4 -pr2 -pl2 -tac">\
                        <button data-project-planner-btn class="ui-btn -pink -sm -pl3 -pr3 -mb2 -font-bold">\
                            <span class="-rel">Get Started!</span>\
                        </button>\
                        <ul class="grid__footer-list">\
                            <li class="grid__footer-list-item -inline-block -font-light"><a class="-link -gray" href="mailto:hello@empathia.agency">hello@empathia.agency</a></li>\
                            <li class="grid__footer-list-item -inline-block -font-light last">52 (33) 1600.2769</li>\
                        </ul>\
                    </footer>\
                </div>\
            </div>\
        </div>',
    prototype : {
        scrollbar : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._document = document;
            this.listElement = this.element.querySelector('.grid__list');
            this._keyPressHandlerRef = this._keyPressHandler.bind(this);
            this._setup()._bindEvents();
        },

        /* Auto-run method from init.
         * Appends and renders its children.
         * @method _setup <private>
         * @return Grid
         */
        _setup : function _setup() {
            this.appendChild(new EM.UI.GridItem({
                view : EM.Views.Home,
                title : 'Introduction',
                index : '01'
            })).render(this.listElement);

            this.appendChild(new EM.UI.GridItem({
                view : EM.Views.CaseStudies,
                title : 'Work',
                index : '02'
            })).render(this.listElement);

            this.appendChild(new EM.UI.GridItem({
                view : EM.Views.WhatWeDo,
                title : 'What We Do',
                index: '03'
            })).render(this.listElement);

            this.appendChild(new EM.UI.GridItem({
                view : EM.Views.AboutUs,
                title : 'About Us',
                index : '04'
            })).render(this.listElement);

            this.appendChild(new EM.UI.GridItem({
                title : 'Careers',
                view : EM.Views.Careers,
                index : '05'
            })).render(this.listElement);

            this.appendChild(new EM.UI.GridItem({
                view : EM.Views.Community,
                title : 'Community',
                index : '06'
            })).render(this.listElement);

            this.appendChild(new EM.UI.GridItem({
                view : EM.Views.Journal,
                title : 'Journal',
                index : '07'
            })).render(this.listElement);

            this.appendChild(new EM.UI.GridItem({
                view : EM.Views.LetsTalk,
                title : 'Let’s Talk',
                index : '08'
            })).render(this.listElement);

            return this;
        },

        setup : function setup() {
            this.scrollbar = new GeminiScrollbar({
                element : this.element.querySelector('.grid__inner'),
                createElements : false,
                autoshow : true
            }).create();
        },

        activateItem : function activateItem(itemName) {
            this.children.forEach(function(child) {
                child.deactivate();
            }, this);

            this[itemName].activate();
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

        /* Handles the keypress event on document.
         * Basically interested on listening when the `ESC` key is pressed to auto-close this modal.
         * @method _keyPressHandler <private> [Function]
         */
        _keyPressHandler : function _keyPressHandler(ev) {
            if (ev.keyCode === CONSTANTS.KEYCODES.ESC) {
                this.dispatch('toggleGrid');
            }
        },

        _activate : function _activate() {
            Widget.prototype._activate.call(this);
            this.scrollbar.update();
            Events.on(this._document, 'keyup', this._keyPressHandlerRef);
        },

        _deactivate : function _deactivate() {
            Widget.prototype._deactivate.call(this);
            Events.off(this._document, 'keyup', this._keyPressHandlerRef);
        },

        destroy : function destroy() {
            Events.off(this.element.querySelector('[data-project-planner-btn]'), 'click', this._projectPlannerBtnClickHandlerRef);
            this._projectPlannerBtnClickHandlerRef = null;
            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});

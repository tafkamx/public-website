/* Application Controller.
 * Appends, renders, listen and communicate its children. (main flow).
 * Initialize and configure the Router.
 * children
 *  - pages
 *  - grid
 *  - menu
 *  - cover
 */
var hasTouchSupport = require('./lib/utils/hasTouchSupport');
var onTransitionEnd = require('./lib/onTransitionEnd');
var classify = require("underscore.string/classify");

Class(EM, 'App').includes(CustomEventSupport, NodeSupport)({
    ALTERNATE_ROUTES_WHITELIST : [
        'project-planner'
    ],

    prototype : {
        init : function init() {
            if (hasTouchSupport) {
                document.body.classList.add('touch');
            }

            this._setup()._bindEvents();
        },

        /* Auto-run method from init.
         * Appends and renders its children.
         * @method _setup <private>
         * @return App
         */
        _setup : function _setup() {
            this.appendChild(new EM.PagesManager({
                name : 'pages'
            })).render(document.body);

            this.appendChild(new EM.UI.Grid({
                name : 'grid'
            })).render(document.body).setup();

            this.appendChild(new EM.UI.Menu({
                name : 'menu'
            })).render(document.body);

            this.appendChild(new EM.UI.GridItemClone({
                name : 'cover'
            })).render(document.body);

            return this;
        },

        /* Auto-run method from init.
         * Subscribe and listen to children events.
         * @method _bindEvents <private>
         * @return App
         */
        _bindEvents : function _bindEvents() {
            this._changeMenuColorHandlerRef = this._changeMenuColorHandler.bind(this);
            this.bind('changeMenuColor', this._changeMenuColorHandlerRef);

            this._showProjectPlannerRef = this._showProjectPlanner.bind(this);
            this.bind('showProjectPlanner', this._showProjectPlannerRef);

            this._menuClickHandlerRef = this._menuClickHandler.bind(this);
            this.menu.bind('click', this._menuClickHandlerRef);

            this._gridItemClickeHandlerRef = this._gridItemClickeHandler.bind(this);
            EM.UI.GridItem.bind('itemClicked', this._gridItemClickeHandlerRef);

            this._bottomLinkClickHandlerRef = this._bottomLinkClickHandler.bind(this);
            this.bind('bottomLinkClicked', this._bottomLinkClickHandlerRef);
            return this;
        },

        /* Configure and initialize the router.
         * @method initRouter <public>
         * @return App
         */
        initRouter : function initRouter() {
            window.Router = require('director').Router();
            window.Router.on('/', function() {});

            // window.Router.on('/grid', function() {});
            window.Router.on('/what-we-do', function() {});
            window.Router.on('/case-studies', function() {});
            window.Router.on('/about-us', function() {});
            window.Router.on('/community', function() {});
            window.Router.on('/carrers', function() {});
            window.Router.on('/journal', function() {});
            window.Router.on('/lets-talk', function() {});
            window.Router.on('/project-planner', function() {});

            window.Router.configure({
                run_handler_in_init : true,
                html5history : true,
                strict : false,
                notfound : function() {
                    console.error('ROUTE NOT FOUND');
                    window.location.replace('/');
                },
                // before : function before() {
                    // if (!window.app.pages.getCurrent()) {
                    //     window.app.pages.setLast(window.app.pages.DEFAULT.name);
                    // }
                    // return window.app.pages.setLast(window.app.getCurrent());
                // },
                on : function on() {
                    // window.app.pages.setCurrent(this.getRoute()[0]);

                    // if (!window.app.pages.getCurrent()) {
                    //     window.app.pages.setCurrent(window.app.DEFAULT.name);
                    // }

                    // if (window.app.pages.getLast() !== window.app.pages.getCurrent()) {
                        // window.app.pages.transition();
                    // }

                    if (window.app.pages._current) {
                        if (window.app.pages._current.constructor.NAME === this.getRoute()[0]) {
                            return;
                        }
                    }

                    window.app.showPage(this.getRoute()[0]);
                }
            });

            window.Router.init(window.location.pathname || '/');

            return this;
        },

        /* Appends and renders a new page on `pages` child.
         * @method showPage <public>
         */
        showPage : function showPage(routeName) {
            if (EM.App.ALTERNATE_ROUTES_WHITELIST.indexOf(routeName) >= 0) {
                if (!this.pages.getCurrent()) {
                    this.pages.appendChild(new EM.Views.Home({name: 'home'}));
                    this.pages.renderView(this.pages.home);
                }

                if (this.projectPlanner) {
                    this.projectPlanner = this.projectPlanner.destroy();
                }

                this.appendChild(new EM.Views.ProjectPlanner({
                    name : 'projectPlanner'
                })).render(document.body);

                window.setTimeout(function() {
                    this.projectPlanner.activate().setup();
                }.bind(this), 0);

                return;
            }

            var ClassName = EM.Views[classify(routeName)];

            if (typeof ClassName === 'function') {
                this.pages.appendChild(new ClassName({name: routeName}));
            } else {
                this.pages.appendChild(new EM.Views.Home({name: 'home'}));
                routeName = 'home';
            }

            return this.pages.renderView(this.pages[routeName]);
        },

        /* Shows the Project Planner view.
         * (Bubbled event handler) (App <- Grid)
         * @method _showProjectPlanner <private>
         */
        _showProjectPlanner : function _showProjectPlanner(ev) {
            ev.stopPropagation();
            window.Router.setRoute(EM.Views.ProjectPlanner.PATH);
        },

        /* Changes the color of the menu.
         * (Bubbled event handler) (App <- Pages <- Any)
         * @method _changeMenuColorHandler <private>
         */
        _changeMenuColorHandler : function _changeMenuColorHandler(ev) {
            ev.stopPropagation();
            this.menu.setFillColor(ev.color);
        },

        /* Handles the click event on Menu.
         * @method _menuClickHandler <private>
         */
        _menuClickHandler : function _menuClickHandler() {
            if (!this.pages._current.coverElement && !this.pages._current.headerWidget) {
                return this._noTransition();
            }

            this.cover.show();

            if (this.menu.active === false) {
                this.menu.activate();
                this.grid.activate();
                this.cover.zoomout();

                onTransitionEnd(this.cover.element, function() {
                    this.cover.hide();
                }.bind(this));
                return;
            }

            this.cover.zoomin();
            this.pages.scrollbar.getViewElement().scrollTop = 0;
            onTransitionEnd(this.cover.element, function() {
                this.cover.hide();
                this.menu.deactivate();
                this.grid.deactivate();
            }.bind(this));
        },

        /* Handles the click dispatched by a GridItem.
         * @method _gridItemClickeHandler <private>
         */
        _gridItemClickeHandler : function _gridItemClickeHandler(ev) {
            ev.stopPropagation();

            this.pages.scrollbar.getViewElement().scrollTop = 0;
            window.Router.setRoute(ev.instance.view.PATH);

            this.cover.setImage(ev.instance.view);
            this.cover.hide();
            this.cover.setPosition(ev.instance.imageElement);
            this.cover.show().zoomin();

            onTransitionEnd(this.cover.element, function() {
                this.cover.hide();
                this.menu.deactivate();
                this.grid.deactivate();
            }.bind(this));
        },

        _bottomLinkClickHandler : function _bottomLinkClickHandler(ev) {
            ev.stopPropagation();
            // this.cover.setImage(ev.target.view);
            // this.cover.hide();
            // this.cover.setPosition(ev.target.element);
            // this.cover.show().zoomin();
            this.pages.scrollbar.getViewElement().scrollTop = 0;
            window.Router.setRoute(ev.target.view.PATH);
        },

        /* Renders a new page without transition.
         * @method _noTransition <private>
         */
        _noTransition : function _noTransition() {
            if (this.menu.active === false) {
                this.menu.activate();
                this.grid.activate();
                return;
            }

            this.menu.deactivate();
            this.grid.deactivate();
        }
    }
});

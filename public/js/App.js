/* Application Controller.
 * Appends, renders, listen and communicate its children. (main flow).
 * Initialize and configure the Router.
 * children
 *  - pages
 *  - grid
 *  - menu
 *  - cover
 */
var Router = require('director').Router();
var hasTouchSupport = require('./lib/utils/hasTouchSupport');
var onTransitionEnd = require('./lib/onTransitionEnd');
var classify = require("underscore.string/classify");

Class(EM, 'App').includes(CustomEventSupport, NodeSupport)({
    ALTERNATE_ROUTES_WHITELIST : [
        'project-planner','general-application'
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

            this._showGeneralApplicationRef = this._showGeneralApplication.bind(this);
            this.bind('showGeneralApplication', this._showGeneralApplicationRef);

            this.bind('projectPlanner:closed', this._projectPlannerClosedHandler.bind(this));
            this.bind('generalApplication:closed', this._generalApplicationClosedHandler.bind(this));

            this.bind('updateRoute', this._updateRoute.bind(this));

            this._toggleGridHandlerRef = this._toggleGridHandler.bind(this);
            this.menu.bind('toggleGrid', this._toggleGridHandlerRef);
            this.grid.bind('toggleGrid', this._toggleGridHandlerRef);

            this._gridItemClickeHandlerRef = this._gridItemClickeHandler.bind(this);
            EM.UI.GridItem.bind('itemClicked', this._gridItemClickeHandlerRef);

            this.grid.bind('activate', function() {
                this.pages.disableScrollbars();
            }.bind(this));

            this.grid.bind('deactivate', function() {
                this.pages.enableScrollbars();
            }.bind(this));

            return this;
        },

        /* Configure and initialize the router.
         * @method initRouter <public>
         * @return App
         */
        initRouter : function initRouter() {
            var appController = this;

            // Router.on('/grid', function() {});
            Router.on('/', function() {});
            Router.on('/what-we-do', function() {});
            Router.on('/case-studies', function() {});
            Router.on('/about-us', function() {});
            Router.on('/community', function() {});
            Router.on('/careers', function() {});
            Router.on('/journal', function() {});
            Router.on('/lets-talk', function() {});
            Router.on('/project-planner', function() {});
            Router.on('/general-application', function() {});

            Router.configure({
                run_handler_in_init : true,
                html5history : true,
                strict : false,
                notfound : function() {
                    // ROUTE NOT FOUND
                    window.location.replace('/');
                },
                on : function on() {
                    if (appController.pages.getCurrent()) {
                        if (appController.pages.getCurrent().constructor.NAME === this.getRoute()[0]) {
                            return;
                        }
                    }

                    appController.showPage(this.getRoute()[0]);
                }
            });

            Router.init(window.location.pathname || '/');

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

                var overlayClass = classify(routeName);
                if (overlayClass === 'ProjectPlanner'){
                    if (this.projectPlanner) {
                        this.projectPlanner = this.projectPlanner.destroy();
                    }

                    this.appendChild(new EM.Overlays.ProjectPlanner({
                        name : 'projectPlanner'
                    })).render(document.body);

                    window.setTimeout(function() {
                        this.projectPlanner.activate().setup();
                    }.bind(this), 0);
                } else if (overlayClass === "GeneralApplication") {
                    if (this.generalApplication) {
                        this.generalApplication = this.generalApplication.destroy();
                    }

                    this.appendChild(new EM.Overlays.GeneralApplication({
                        name : 'generalApplication'
                    })).render(document.body);

                    window.setTimeout(function() {
                        this.generalApplication.activate().setup();
                    }.bind(this), 0);
                }

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

        /* Sets a new Route as active for the Router.
         * (Bubbled event handler)
         * @method _updateRoute <private>
         */
        _updateRoute : function _updateRoute(ev) {
            var app = this;

            ev.stopPropagation();

            if (this.grid.active) {
                this._toggleGridHandler();
            }

            if (Router.getPath() === ev.route) {
                return;
            }

            if (this.pageLoader) {
                this.pageLoader = this.pageLoader.destroy();
            }

            this.appendChild(new EM.UI.PageLoader({
                name : 'pageLoader'
            })).render(document.body);

            setTimeout(function() {
                app.pageLoader.activate();

                onTransitionEnd(app.pageLoader.element, function() {
                    app.pages.scrollbar.getViewElement().scrollTop = 0;
                    Router.setRoute(ev.route);
                    app.pageLoader.gone();

                    onTransitionEnd(app.pageLoader.element, function() {
                        app.pageLoader.destroy();
                    });
                });
            }, 100);
        },

        /* Shows the Project Planner view.
         * (Bubbled event handler) (App <- Grid)
         * @method _showProjectPlanner <private>
         */
        _showProjectPlanner : function _showProjectPlanner(ev) {
            ev.stopPropagation();
            Router.setRoute(EM.Overlays.ProjectPlanner.PATH);
        },

        /* After closing the projectPlanner, it restores the url to the latest
         * current view.
         * @method _projectPlannerClosedHandler <private>
         */
        _projectPlannerClosedHandler : function _projectPlannerClosedHandler() {
            if (this.pages.getCurrent().constructor.PATH) {
                Router.setRoute(this.pages.getCurrent().constructor.PATH);
            }
        },
        /* Shows the General Application view.
         * (Bubbled event handler) (App <- Grid)
         * @method _showGeneralApplication <private>
         */
        _showGeneralApplication : function _showGeneralApplication(ev) {
            ev.stopPropagation();
            Router.setRoute(EM.Overlays.GeneralApplication.PATH);
        },

        /* After closing the generalApplication, it restores the url to the latest
         * current view.
         * @method _generalApplicationClosedHandler <private>
         */
        _generalApplicationClosedHandler : function _generalApplicationClosedHandler() {
            if (this.pages.getCurrent().constructor.PATH) {
                Router.setRoute(this.pages.getCurrent().constructor.PATH);
            }
        },
        /* Changes the color of the menu.
         * (Bubbled event handler) (App <- Pages <- Any)
         * @method _changeMenuColorHandler <private>
         */
        _changeMenuColorHandler : function _changeMenuColorHandler(ev) {
            ev.stopPropagation();
            this.menu.setFillColor(ev.color);
        },

        /* Toggles the Grid Overlay.
         * @method _toggleGridHandler <private>
         */
        _toggleGridHandler : function _toggleGridHandler() {
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
            Router.setRoute(ev.instance.view.PATH);

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

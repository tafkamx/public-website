var Events = require('./../../lib/events');

Class(EM.UI, 'JoinUsMessage').inherits(Widget).includes(BubblingSupport)({
    prototype : {
        /* Jobs data [Array]
         */
        data : {
            jobs: null
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup()._bindEvents();

            if (this.data.jobs && this.data.jobs.length) {
                this.appendChild(new EM.UI.JobList({
                    name : 'jobList',
                    data : {
                        jobs : this.data.jobs
                    }
                })).render(this.element, this.element.firstElementChild);
            } else {
                this.appendChild(new EM.UI.NoJobsAvailable({
                    name : 'noJobs'
                })).render(this.element, this.element.firstElementChild);
            }
        },
        _setup : function _setup() {
            // Appends Apply Button
            this.appendChild(new EM.UI.Button({
                name : 'applyButton',
                className : '-lg -green -pl5 -pr5 -mb1',
                text : 'Apply'
            })).render(this.element);

            return this;
        },
        _bindEvents : function _bindEvents(){
            this._generalApplicationBtnClickHandlerRef = this._generalApplicationBtnClickHandler.bind(this);
            Events.on(this.applyButton.element, 'click', this._generalApplicationBtnClickHandlerRef);

            return this;
        },
         /* Dispatch a custom event `showGeneralApplication`, uses BubblingSupport to bubble up to App.
         * @method _generalApplicationBtnClickHandler <private>
         */
        _generalApplicationBtnClickHandler : function _generalApplicationBtnClickHandler() {
            this.dispatch('showGeneralApplication');
        },
        destroy : function destroy() {
            Events.off(this.applyButton.element, 'click', this._generalApplicationBtnClickHandlerRef);
            this._generalApplicationBtnClickHandlerRef = null;

            Widget.prototype.destroy.call(this);
            return null;
        }
    }
});

Class(EM.UI, 'JoinUsMessage').inherits(Widget)({
    prototype : {
        /* Jobs data [Array]
         */
        data : {
            jobs: null
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            /*
            this.appendChild(new EM.UI.Button({
                name : 'applyButton',
                className : '-lg -green -pl5 -pr5 -mb1',
                text : 'Apply'
            })).render(this.element);
            */

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
        }
    }
});

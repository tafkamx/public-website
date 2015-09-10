Class(EM.UI, 'JoinUsMessage').inherits(Widget)({
    HTML : '\
        <div>\
            <button class="ui-btn -lg -green -pl5 -pr5 -mb1">Apply</button>\
        </div>\
    ',

    prototype : {
        /* Jobs data [Array]
         */
        data : {
            jobs: null
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);

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

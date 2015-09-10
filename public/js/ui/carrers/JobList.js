Class(EM.UI, 'JobList').inherits(Widget)({
    HTML : '\
        <div>\
            <section class="join-us__jobs"></section>\
            <p class="join-us__text -mb2 -font-light -color-neutral-light">Didn’t see an available position suited for you? Don’t worry, you can still apply. We’re always open to meet new people and hire amazing talent. Tell us why should we join forces.</p>\
        </div>',

    prototype : {
        /* Jobs data [Array]
         */
        data : {
            jobs: null
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.listElement = this.element.querySelector('.join-us__jobs');

            this.data.jobs.forEach(function(job) {
                this.appendChild(new EM.UI.Job({
                    name : 'job_' + job.id,
                    data : job
                })).render(this.listElement);
            }, this);
        }
    }
});

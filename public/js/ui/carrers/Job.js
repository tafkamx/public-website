Class(EM.UI, 'Job').inherits(Widget)({
    HTML : '\
        <article class="join__us-job-list-item -rel">\
            <div class="job-position -tal">\
                <span class="job-position-title">{data.title}</span>\
                <span class="job-position-desc -color-neutral-light -abs">{data.description}</span>\
            </div>\
            <div class="job-link -abs">\
                <a class="-color-green" target="_blank" href="{data.link}">View in LinkedIn</a>\
            </div>\
        </article>',

    prototype : {
        data : {
            title : null,
            description : null,
            link : null
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.element.querySelector('.job-position-title').textContent = this.data.title;
            this.element.querySelector('.job-position-desc').textContent = this.data.description;
            this.element.querySelector('.job-link a').href = this.data.link;
        }
    }
});

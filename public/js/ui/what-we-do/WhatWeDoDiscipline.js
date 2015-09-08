Class(EM.UI, 'WhatWeDoDiscipline').inherits(Widget)({
    ELEMENT_CLASS : 'what-we-do__disciplines-row -row -vh',
    HTML : '\
        <div data-section="discipline" data-name="">\
            <div class="-col-6"></div>\
            <div class="what-we-do__discipline -col-6 -pl2 -table -full-height">\
                <div class="what-we-do__discipline-inner -table-cell -vam">\
                    <p class="what-we-do__discipline-label -ttu -mb1">Strategic Disciplines</p>\
                    <h3 class="what-we-do__discipline-title -mt0 -mb1"></h3>\
                    <p class="what-we-do__discipline-desc -font-light"></p>\
                </div>\
            </div>\
        </div>',

    prototype : {
        data : {
            title : null,
            description : null
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.element.setAttribute('data-name', this.name);
            this.element.querySelector('.what-we-do__discipline-title').textContent = this.data.title;
            this.element.querySelector('.what-we-do__discipline-desc').textContent = this.data.description;
        }
    }
});

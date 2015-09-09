Class(EM.UI, 'WhatWeDoDiscipline').inherits(Widget)({
    ELEMENT_CLASS : 'what-we-do__disciplines-row -row',
    HTML : '\
        <div data-section="discipline" data-name="">\
            <div class="-col-6"></div>\
            <div class="what-we-do__discipline -col-6">\
                <div class="what-we-do__discipline-inner">\
                    <div class="what-we-do__discipline-inner-center -pl5 -pr5">\
                        <p class="what-we-do__discipline-label -ttu -mb1">Strategic Disciplines</p>\
                        <h3 class="what-we-do__discipline-title -mt0 -mb1"></h3>\
                        <p class="what-we-do__discipline-desc -font-light"></p>\
                    </div>\
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

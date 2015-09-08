Class(EM.UI, 'WhatWeDoOffering').inherits(Widget)({
    ELEMENT_CLASS : 'what-we-do__offerings-row -row -vh',
    HTML : '\
        <div data-section="offering" data-name="">\
            <div class="what-we-do__offering-icon -col-6 -tac"></div>\
            <div class="what-we-do__offering -col-6 -pl2 -table -full-height">\
                <div class="what-we-do__offering-inner -table-cell -vam">\
                    <p class="what-we-do__offering-label -ttu -mb1">Offerings</p>\
                    <h3 class="what-we-do__offering-title -mt0 -mb1"></h3>\
                    <p class="what-we-do__offering-desc -font-light"></p>\
                </div>\
            </div>\
        </div>',

    ICON : '<svg><use xlink:href="#{svgId}" stroke="url(#{svgGrad})"></use></svg>',

    prototype : {
        data : {
            title : null,
            description : null
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.element.setAttribute('data-name', this.name);
            this.element.querySelector('.what-we-do__offering-title').textContent = this.data.title;
            this.element.querySelector('.what-we-do__offering-desc').textContent = this.data.description;

            var icon = this.constructor.ICON;
            icon = icon.replace(/{svgId}/, this.data.svgId);
            icon = icon.replace(/{svgGrad}/, this.data.svgGrad);
            this.element.querySelector('.what-we-do__offering-icon').insertAdjacentHTML('beforeend', icon);
        }
    }
});

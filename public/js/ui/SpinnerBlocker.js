Class(EM.UI, 'SpinnerBlocker').inherits(Widget)({
    HTML: '\
        <div class="ui-spinner-blocker">\
            <div class="ui-spinner-blocker__wrapper">\
                <div class="sk-spinner sk-spinner-pulse"></div>\
            </div>\
        </div>',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
        }
    }
});

var inlineStyle = require('./../../lib/inline-style');

Class(EM.UI, 'NoJobsAvailable').inherits(Widget)({
    HTML : '\
        <div class="-pt2">\
            <p data-first class="-mb1">Sorry. We have no available positions at the moment.</p>\
            <p data-last class="-fsi -mb5">Don’t worry, you can still apply. We’re always open to meet new people and hire amazing talent. Tell us why should we join forces.</p>\
        </div>',

    prototype : {
       init : function init(config) {
            Widget.prototype.init.call(this, config);

            inlineStyle(this.element, {
                width : '48%',
                margin : '0 auto'
            });

            inlineStyle(this.element.querySelector('[data-first]'), {
                fontSize : '1.667rem',
                color : '#7E888C'
            });

            inlineStyle(this.element.querySelector('[data-last]'), {
                fontSize : '1.250rem',
                color : '#A1ADB3'
            });
        }
    }
});

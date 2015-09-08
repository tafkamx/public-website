(function(factory) {
    'use strict';

    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        window.TextGradientWebkit = factory();
    }
}(function factory() {
    'use strict';

     return {
         _init : function _init() {
             this.element = document.createElement('span');

             if (this.data.selector) {
                 this.element.textContent = this.data.selector.textContent;
             }

             if (this.data.text) {
                this.element.textContent = this.data.text;
             }

             this.styles = {
                display: 'inline-block',
                color: this.data.fallbackColor || this.data.to,
                background: '-webkit-linear-gradient(' + this.data.direction + ', ' + this.data.to + ',' + this.data.from + ')',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            };

            Object.keys(this.styles).forEach(function(propertyName) {
                this.element.style[propertyName] = this.styles[propertyName];
            }, this);
         }
     };
}));

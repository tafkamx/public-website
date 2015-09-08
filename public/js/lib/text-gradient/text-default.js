(function(factory) {
    'use strict';

    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        window.TextGradientDefault = factory();
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
                position: 'relative',
                display: 'inline-block',
                color: this.data.fallbackColor || this.data.to,
                width: '100%'
            };

            Object.keys(this.styles).forEach(function(propertyName) {
                this.element.style[propertyName] = this.styles[propertyName];
            }, this);

            var svg = "\
                <svg height='0' width='0' style='position:absolute'>\
                    <mask id='svgGrad" + this.data.direction +"' maskUnits='objectBoundingBox' maskContentUnits='objectBoundingBox'>\
                        {linear}\
                            <stop stop-color='white' offset='0'/>\
                            <stop stop-color='white' stop-opacity='0' offset='1'/>\
                        </linearGradient>\
                        <rect x='0' y='0' width='1' height='1' fill='url(#g)'/>\
                    </mask>\
                </svg>";

            (function(t) {
                if (t.data.direction === 'right') {
                    svg = svg.replace(/{linear}/, "<linearGradient id='g' gradientUnits='objectBoundingBox' x1='0' x2='1'>");
                    return;
                }

                if (t.data.direction === 'left') {
                    svg = svg.replace(/{linear}/, "<linearGradient id='g' gradientUnits='objectBoundingBox' x1='1' x2='0'>");
                    return;
                }

                if (t.data.direction === 'bottom') {
                    svg = svg.replace(/{linear}/, "<linearGradient id='g' gradientUnits='objectBoundingBox' y1='0' y2='1'>");
                    return;
                }

                if (t.data.direction === 'top') {
                    svg = svg.replace(/{linear}/, "<linearGradient id='g' gradientUnits='objectBoundingBox' y1='1' y2='0'>");
                    return;
                }

                svg = svg.replace(/{linear}/, "<linearGradient id='g' spreadMethod='pad' gradientUnits='objectBoundingBox' x1='0' x2='1'>");
                return;
                // return "<linearGradient id='g' spreadMethod='pad' gradientUnits='objectBoundingBox' gradientTransform='rotate(" + t.data.direction.replace(/deg/, '') + ")' x1='0' y1='0' x2='0' y2='1'>";
            })(this);

            var mask = document.createElement('span');
            if (this.data.selector) {
                mask.textContent = this.data.selector.textContent;
            }

            if (this.data.text) {
                mask.textContent = this.data.text;
            }

            var overStyle = {
                display: 'block',
                mask: 'url(#svgGrad' + this.data.direction +')',
                color: this.data.from,
                position: 'absolute',
                width: '100%',
                left: 0,
                right: 0,
                zIndex: 1,
                textAlign: 'inherit'
            };

            Object.keys(overStyle).forEach(function(propertyName) {
                mask.style[propertyName] = overStyle[propertyName];
            });

            this.element.insertBefore(mask, this.element.firstChild);
            this.element.insertAdjacentHTML('afterbegin', svg);
         }
     };
}));

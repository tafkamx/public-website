var TWEEN = require('tween.js');
var raf = require('raf');

function _scroll(element) {
    var x = (element.scrollLeft || element.pageXOffset || (element.documentElement && element.documentElement.scrollLeft));
    var y = (element.scrollTop || element.pageYOffset || (element.documentElement && element.documentElement.scrollTop));
    return {y: y, x: x};
}

module.exports = function scrollTo(element, options) {
    options = options || {};

    var start = _scroll(element);

    var tween = new TWEEN.Tween(start)
    .easing(options.easing || TWEEN.Easing.Circular.Out)
    .to({x: start.x + options.x, y: start.y + options.y}, options.duration || 1000)
    .onUpdate(function() {
        var x = this.x | 0;
        var y = this.y | 0;

        if (element.scrollTo) {
            element.scrollTo(x, y);
            return;
        }

        element.scrollLeft = x;
        element.scrollTop = y;
    })
    .onComplete(function() {
        animate = function(){};
        options.onComplete && options.onComplete();
    })
    .start();

    function animate() {
        raf(animate);
        TWEEN.update();
    }

    animate();

    return tween;
};

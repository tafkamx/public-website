/*
 * @ http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/
 */
(function(root, factory) { 'use strict';
    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ShuffleLetters = factory();
    }
}(this, function factory() {
    function merge(a, b) {
        for (var propertyName in b) {
            a[propertyName] = b[propertyName];
        }
    }

    function ShuffleLetters(element, config) {
        if (typeof element === 'undefined') {
            throw new Error('R: `element` param is required');
        }

        this.element = element;

        this.opts = {
            chars : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.?/\\(^)![]{}*&^%$#'\"",
            text : element.textContent,
            times : 1,
            callback : null
        };

        merge(this.opts, config);
    }

    ShuffleLetters.prototype.shuffle = function(options) {
        if (options) {
            merge(this.opts, options);
        }

        var r = this;
        var string = this.opts.text.split('');
        var len = string.length;
        var start = -this.opts.times;

        function shuffle() {
            var i, strCopy = string.slice(0);

            if (start > len) {
                if (r.opts.callback && typeof r.opts.callback === 'function') {
                    r.opts.callback.call(r);
                }

                return cancelAnimationFrame(r._raf);
            }

            for (i = Math.max(start,0); i < len; i++){
                if (i < (start + r.opts.times)) {
                    if (strCopy[i] !== " ") {
                        strCopy[i] = r.opts.chars[Math.floor(Math.random() * r.opts.chars.length)];
                    }
                } else {
                    strCopy[i] = "";
                }
            }

            r.element.textContent = strCopy.join("");

            start += 1;
            requestAnimationFrame(shuffle);
        }

        this._raf = requestAnimationFrame(shuffle);
    };

    return ShuffleLetters;
}));

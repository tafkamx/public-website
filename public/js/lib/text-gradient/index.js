(function(factory) {
    'use strict';
    if (typeof exports === 'object') {
        module.exports = factory(
            require('./text-default'),
            require('./text-webkit')
        );
    } else {
        window.TextGradient = factory(
            window.TextGradientDefault,
            window.TextGradientWebkit
        );
    }
}(function factory(TextGradientDefault, TextGradientWebkit) {
    'use strict';

    function TextGradient(config) {
        /* default props */
        this.data = {
            selector : null,
            text : '',
            from : 'transparent',
            to : 'transparent',
            direction : 'right',
            fallbackColor : ''
        };

        Object.keys(config || {}).forEach(function (propertyName) {
            this.data[propertyName] = config[propertyName];
        }, this);

        this._init();

        return this;
    }

    /* Includes the specific behaviour of the passed implementation into the class.
     * @helper include <protected> [Function]
     */
    function include(implementation) {
        var property;
        for (property in implementation) {
            if (implementation.hasOwnProperty(property)) {
                TextGradient.prototype[property] = implementation[property];
            }
        }
    }

    /* Holds the implementation Object.
     * @property _implementation <protected, static> [Object] TextGradientDefault
     */
    TextGradient._implementation = TextGradientDefault;

    /* Checks if the implementation needs to be changed
     * @method _updateImplementation <protected, static> [Function]
     */
    TextGradient._updateImplementation = function _updateImplementation() {
        if ('WebkitTextFillColor' in document.documentElement.style) {
            this._implementation = TextGradientWebkit;
        }
    };

    TextGradient.prototype = {
        render : function render(element) {
            if (!this.element) {
                console.warn('calling on destroyed object');
            }

            if (element) {
                element.textContent = '';
                element.appendChild(this.element);
            } else if (this.data.selector) {
                this.data.selector.textContent = '';
                this.data.selector.appendChild(this.element);
            }

            return this;
        },

        destroy : function destroy() {
            if (this.element && (this.element.parentNode)) {
                this.element.parentNode.removeChild(this.element);
            }

            this.element = null;

            return null;
        },

        /* Implementation to initialize.
         * All implementations should include this method.
         */
        _init : function _init() {
            throw new Error('TextGradient.prototype._init not implemented');
        }
    };

    /* Sets the implementation and includes its methods/properties */
    TextGradient._updateImplementation();
    include(TextGradient._implementation);

    return TextGradient;
}));

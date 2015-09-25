var Events = require('./../lib/events');
var bytesToSize = require('./../lib/bytes-to-size');

Class(EM.UI, 'AttachFile').inherits(Widget).includes(BubblingSupport)({
    ELEMENT_CLASS : 'ui-attach-file -rel',
    HTML : '\
        <div>\
            <div class="ui-attach-file-text -ellipsis">\
                <span class="attach-file-name"></span>\
                <span class="attach-file-size"></span>\
            </div>\
            <svg class="attach-file__close -s16 -abs -clickable">\
                <use xlink:href="#svg-close"></use>\
            </svg>\
        </div>',

    prototype : {
        /* File
         */
        data : {
            lastModified : null,
            lastModifiedDate : null,
            name : '',
            size : 0,
            type : ''
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.element.querySelector('.attach-file-name').textContent = this.data.name;
            this.element.querySelector('.attach-file-size').textContent = '(' + bytesToSize(this.data.size) + ')';

            this._removeHandlerRef = this._removeHandler.bind(this);
            Events.on(this.element.querySelector('.attach-file__close'), 'click', this._removeHandlerRef);
        },

        _removeHandler : function _removeHandler() {
            this.dispatch('removeFile');
        },

        destroy : function destroy() {
            Events.off(this.element.querySelector('.attach-file__close'), 'click', this._removeHandlerRef);
            this._removeHandlerRef = null;

            Widget.prototype.destroy.call(this);

            return null;
        }
    }
});

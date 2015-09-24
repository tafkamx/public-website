Class(EM.UI, 'AttachFilesList').inherits(Widget)({
    ELEMENT_CLASS : 'ui-attach-files-list',
    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this._removeFileHandlerRef = this._removeFileHandler.bind(this);
            this.bind('removeFile', this._removeFileHandlerRef);
        },

        /* Append AttachFile widgets to the AttachFilesList.
         * @param files <required> [Array]
         */
        add : function add(files) {
            files.forEach(function(file) {
                this.appendChild(new EM.UI.AttachFile({
                    name : 'file_' + this.children.length,
                    data : file
                })).render(this.element);
            }, this);
            return this;
        },

        /* Remove any children without destroying itself.
         * @method flush <public> [Function]
         */
        flush : function flush() {
            while(this.children.length > 0) {
                this.children[0].destroy();
            }
            return this;
        },

        _removeFileHandler : function _removeFileHandler(ev) {
            var index = null;
            var found = this.children.some(function(file, i) {
                if (file === ev.target) {
                    index = i;
                    return true;
                }
            });

            if (found === false) {
                throw Error('File cannot be removed. File not found.');
            }

            this.children[index].destroy();
            this.dispatch('removeAttachment', {index: index});
        }
    }
});

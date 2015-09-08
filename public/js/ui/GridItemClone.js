/* globals EM */
Class(EM.UI, 'GridItemClone').inherits(Widget)({
    ELEMENT_CLASS : 'grid__item-clone -fix',
    HTML : '\
        <div class="-abs-before">\
            <div data-inner class="grid__item-clone-inner -img-cover -matisse -full-height -rel"></div>\
        </div>',

    prototype : {
        _coords: null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.image = this.element.querySelector('[data-inner]');
        },

        /* Sets the backgroundImage and gradient.
         * @method setImage <public>
         * @return GridItemClone
         */
        setImage : function setImage(view) {
            if (!view.BG) {
                return this;
            }

            this.element.className = this.element.className.replace(/-gradient-\w+/g, '');
            this.element.classList.add(view.GRADIENT);
            this.image.style.backgroundImage = 'url(' + view.BG + ')';
            return this;
        },

        /* Stores the coordinates to later perform `zoomout` using them as referece.
         * @method setCoords <public>
         * @return GridItemClone
         */
        setCoords : function setCoords(element) {
            this._coords = element.getBoundingClientRect();
            return this;
        },

        /* Positions and resize the Image using the passed coords without transitions.
         * @method setPosition <public>
         * @return GridItemClone
         */
        setPosition : function setPosition(imageElement) {
            this.setCoords(imageElement);
            this.element.classList.add('notransition');
            this.zoomout();
            return this;
        },

        /* Clears its inline styles and add transitions back.
         * This will transition the cover from the current coords/size it holds
         * at the moment to its original position (full cover size).
         * @method zoomin <public>
         */
        zoomin : function zoomin() {
            this.element.offsetHeight; // force reflow
            this.element.classList.remove('notransition');
            this.element.style.webkitTransform = 'none';
            this.element.style.transform = 'none';
            return this;
        },

        /* Positions and resize the Image to its Grid position.
         * @method zoomout <public>
         */
        zoomout : function zoomout(coords) {
            if (coords) {
                this._coords = coords;
            }

            if (!this._coords && !coords) {
                return;
            }

            this.element.style.webkitTransform = 'translate(' + ~~this._coords.left + 'px, ' + ~~this._coords.top + 'px) scale(.21)';
            this.element.style.transform = 'translate(' + ~~this._coords.left + 'px, ' + ~~this._coords.top + 'px) scale(.21)';
            return this;
        },

        /* Sets its opacity to zero.
         * @method hide <public>
         * @return GridItemClone
         */
        hide : function() {
            this.element.style.opacity = 0;
            return this;
        },

        /* Sets its opacity to 1.
         * @method show <public>
         * @return GridItemClone
         */
        show : function show() {
            this.element.style.opacity = 1;
            return this;
        }
    }
});

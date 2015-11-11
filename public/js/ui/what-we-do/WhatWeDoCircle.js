var inlineStyle = require('./../../lib/inline-style');
var addClass = require('./../../lib/utils/class-add');
var removeClass = require('./../../lib/utils/class-remove');
var hasClass = require('./../../lib/utils/class-has');

Class(EM.UI, 'WhatWeDoCircle').inherits(Widget)({
    HTML : '\
        <div class="wwd__circle -abs">\
            <svg viewBox="0 0 100 100">\
                <circle cx="50" cy="50" r="49" stroke-width="1" stroke="url(#gradient-3)" fill="none" vector-effect="non-scaling-stroke"></circle>\
            </svg>\
            <span class="wwd__inner-circle-label -abs -font-light">UX</span>\
            <div class="wwd__circle-content-wrapper">\
                <p class="wwd__discipline-label -ttu -mb1">Strategic Disciplines</p>\
                <ul class="wwd__list">\
                    <li class="wwd__list-item -font-light" data-name="insights">\
                        <svg class="-s16r"><use xlink:href="#svg-checkmark"></use></svg>\
                        <p>Insights &amp; Planning</p>\
                    </li>\
                    <li class="wwd__list-item -font-light" data-name="analytics">\
                        <svg class="-s16r"><use xlink:href="#svg-checkmark"></use></svg>\
                        <p>Analytics</p>\
                    </li>\
                    <li class="wwd__list-item -font-light" data-name="visual-design">\
                        <svg class="-s16r"><use xlink:href="#svg-checkmark"></use></svg>\
                        <p>Visual Design</p>\
                    </li>\
                    <li class="wwd__list-item -font-light" data-name="interaction-design">\
                        <svg class="-s16r"><use xlink:href="#svg-checkmark"></use></svg>\
                        <p>Interaction Design</p>\
                    </li>\
                    <li class="wwd__list-item -font-light" data-name="technology">\
                        <svg class="-s16r"><use xlink:href="#svg-checkmark"></use></svg>\
                        <p>Technology</p>\
                    </li>\
                    <li class="wwd__list-item -font-light" data-name="quality-assurance">\
                        <svg class="-s16r"><use xlink:href="#svg-checkmark"></use></svg>\
                        <p>Quality Assurance</p>\
                    </li>\
                </ul>\
            </div>\
        </div>',

    prototype : {
        /* Base Element reference to positioning the circle.
         * @property referenceElement <required> [HTMLElement]
         */
        referenceElement : null,

        _state: {
            nor: false,
            fix: false,
            abs: false
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this.disciplines = [].slice.call(this.element.querySelectorAll('.wwd__list-item'), 0);
        },

        /* Centers the circle vertically and aligns it horizontally constrained
         * to the passed `referenceElement` config option.
         * @method center <public>
         * @returns WhatWeDoCircle
         */
        center : function center() {
            var rects = this.referenceElement.getBoundingClientRect();
            var left = ~~rects.left;
            var width = ~~rects.width - 60;
            var height = width;

            this._availableHeight = window.innerHeight;

            inlineStyle(this.element, {
                width: width + 'px',
                height : height + 'px',
                left : left + 'px',
                top: (this._availableHeight - height) / 2 + 'px'
            });

            return this;
        },

        showDiscipline : function showDiscipline(name) {
            var found = false;

            this.disciplines.forEach(function(discipline) {
                if (found) {
                    if (hasClass(discipline, 'active')) {
                        removeClass(discipline, 'active');
                    }
                    return;
                }

                if (hasClass(discipline, 'active') === false) {
                    addClass(discipline, 'active');
                }

                if (discipline.dataset.name === name) {
                    found = true;
                }
            });

            return this;
        },

        /* Sets the widget in absolute position relative to the top (original state)
         * @method nor <public> [Function]
         * @return undefined
         */
        nor : function nor() {
            if (this._state.nor) {return;}

            this._state.nor = true;
            this._state.fix = false;
            this._state.abs = false;

            inlineStyle(this.element, {
                position: 'absolute',
                top: (this._availableHeight - this.element.offsetHeight) / 2 + 'px',
                left: 'initial',
                bottom: 'initial'
            });
        },

        /* Sets the widget to fixed position.
         * @method fix <public> [Function]
         * @return undefined
         */
        fix : function fix() {
            if (this._state.fix) {return;}

            this._state.fix = true;
            this._state.nor = false;
            this._state.abs = false;

            var rects = this.element.getBoundingClientRect();

            inlineStyle(this.element, {
                position: 'fixed',
                top: rects.top + 'px',
                left: rects.left + 'px'
            });
        },

        /* Sets the widget in absolute position relative to the bottom.
         * @method abs <public> [Function]
         * @return undefined
         */
        abs : function abs() {
            if (this._state.abs) {return;}

            this._state.abs = true;
            this._state.nor = false;
            this._state.fix = false;

            inlineStyle(this.element, {
                position: 'absolute',
                top: 'initial',
                left: 'initial',
                bottom: (this._availableHeight - this.element.offsetHeight) / 2 + 'px'
            });
        }
    }
});

var addClass = require('./../../lib/utils/class-add');
var removeClass = require('./../../lib/utils/class-remove');
var hasClass = require('./../../lib/utils/class-has');

Class(EM.UI, 'WhatWeDoCircle').inherits(Widget)({
    HTML : '\
        <div class="wwd__circle -rel">\
            <svg viewBox="0 0 100 100">\
                <circle cx="50" cy="50" r="49" stroke-width="1" stroke="url(#gradient-3)" fill="none" vector-effect="non-scaling-stroke"></circle>\
            </svg>\
            <span class="wwd__inner-circle-label -abs -font-light">UX</span>\
            <div class="wwd__circle-content-wrapper">\
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

            this.element.style.width = width + 'px';
            this.element.style.height = height + 'px';
            this.element.style.left = left + 'px';

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
        }
    }
});

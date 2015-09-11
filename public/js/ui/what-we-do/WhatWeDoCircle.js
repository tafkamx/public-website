Class(EM.UI, 'WhatWeDoCircle').inherits(Widget)({
    HTML : '\
        <div class="wwd__circle -rel">\
            <div class="wwd__inner-circle">\
                <span class="wwd__inner-circle-label -abs -font-light">UX</span>\
            </div>\
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
                    discipline.classList.remove('active');
                    return;
                }

                discipline.classList.add('active');

                if (discipline.dataset.name === name) {
                    found = true;
                }
            });
            return this;
        }
    }
});

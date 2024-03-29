Class(EM.UI, 'WhatWeDoOfferings').inherits(Widget)({
    ELEMENT_CLASS : 'what-we-do__offerings -rel',
    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.WhatWeDoOffering({
                name : 'applications-and-platforms',
                data : {
                    title : 'Applications & Platforms',
                    description : 'Systems that provide utility. On the web, desktops or any stationed digital device like touch-screen kiosks.',
                    svgId : 'svg-cloud-stroke',
                    svgGrad : 'gradient-1',
                    viewBox : '0 0 301 198',
                    path : '<path d="M35.75 193.808c109.564.478 179.84-1.324 224.15-3.482 20.672-1.102 36.707-18.468 36.16-39.163-.55-20.695-17.48-37.19-38.18-37.196-.01-.006-.017-.006-.025-.006-13.815 0-14.68 25.472 1.295 25.472C291.53 139.432 272.685 4 171.66 4 55.096 4 19.015 134.13 53.73 134.13c19.17 0 17.99-23.892-4.3-23.892C6.413 110.238 4 169.388 4 184.31" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="transparent" fill-rule="evenodd"/>'
                }
            })).render(this.element);

            this.appendChild(new EM.UI.WhatWeDoOffering({
                name : 'e-commerce',
                data : {
                    title : 'E-Commerce',
                    description : 'Shopping experiences online that increase sales for our partners and feel good for the consumers.',
                    svgId : 'svg-commerce-stroke',
                    svgGrad : 'gradient-2',
                    viewBox : '0 0 268 214',
                    path : '<path d="M23.753 21.663H12.866C7.97 21.663 4 17.71 4 12.833v-.002C4 7.955 7.97 4 12.866 4H27.26c4.268 0 7.9 3.1 8.55 7.304l21.35 137.584c1.032 6.655 6.774 11.57 13.533 11.585l174.816.403c9.013 5.648 24.096-114.206 15.384-119.664-67.695-10.08-134.688-11.106-200.81-.865-2.737 1.77 14.156 105.21 23.21 151.48 2.01 10.277 10.61 17.915 21.102 17.254 9.934-.626 17.667-8.833 17.667-18.746V179.14c22.46-3.864 44.92-5.777 67.386 0v10.028c0 9.312 7.577 16.86 16.925 16.86s16.927-7.548 16.927-16.86v-11.804s15.658-1.834 20.98-1.245" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="transparent" fill-rule="evenodd"/>'
                }
            })).render(this.element);

            this.appendChild(new EM.UI.WhatWeDoOffering({
                name : 'brand-development',
                data : {
                    title : 'Brand Development',
                    description : 'Brand systems and narratives to give our partners a unique, cohesive and congruent identity in highly competitive markets.',
                    svgId : 'svg-brand-stroke',
                    svgGrad : 'gradient-3',
                    viewBox : '0 0 219 300',
                    path : '<path d="M175.808 260.077c-15.146 20.016-38.517 35.39-66.368 35.39C82.914 295.468 4 290.79 4 135.9 4 .3 109.89 4.205 109.89 4.205s104.578-10.152 104.578 112.03c0 143.887-88.466 156.092-107.8 156.092-19.333 0-39.01-10.953-47.06-19.12 0 0 11.347-10.297 47.27-10.297 35.92 0 32.31 8.958 42.263-1.982 9.953-10.94-10.998-14.41-42.832-14.41-24.5 0-37.732 6.595-52.888 9.48-3.66.695-10-9.923-8.24-11.66 7.55-7.456 36.318-14.594 61.62-14.594 31.2 0 43.83 5.195 56.264 5.195 12.436 0 87.75-191.573-54.23-191.573-77.6 0-80.862 81.358-80.72 114.54 17.724 3.044 17.78-1.86 18.71-12.367 3.904-41.793 11.348-82.36 61.867-82.19 108.03 0 54.79 155.538 46.06 155.538-8.732 0-10.11-5.943-48.304-5.943-27.685 0-49.272 7.555-64.747 14.665-4.375 2.008-9.135-18.646-6.626-19.26 21.34-5.23 57.39-11.714 71.644-11.714 16.482 0 28.14 2.386 38.455 2.386 10.316 0 42.496-116.878-36.63-118.443-42.743-.847-44.67 54.523-46.03 73.253-1.586 21.818-24.9 18.47-33.07 19.635-4.934.703-3.273 19.065 1.37 19.892 11.867 2.114 42.166-12.103 76.182-11.164 16.466.454 24.035.522 30.008.522 5.973 0 22.01-82.164-28.437-82.164-33.41 0-30.23 67.398-30.23 67.398s43.38 2.197 47.868-.763c4.488-2.96 7.06-46.203-17.497-46.203-14.517 0-16.174 25.974-.036 25.974" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="transparent" fill-rule="evenodd"/>'
                }
            })).render(this.element);

            this.appendChild(new EM.UI.WhatWeDoOffering({
                name : 'mobile',
                data : {
                    title : 'Mobile',
                    description : 'Connect our partners with their consumers on any of their mobile devices, whether it’s a smartphone, tablet or smart watch.',
                    svgId : 'svg-mobile-stroke',
                    svgGrad : 'gradient-4',
                    viewBox : '0 0 192 267',
                    path : '<path d="M26.688 262.935H5.628C4.785 183.893 3.81 9.922 4.033 4h180.13c3.352 93.443 2.2 170.675 3.074 256.715-51.303 2.45-91.948 3.36-146.322 0-2.017-52.525-.22-107.777-.016-168.51.012-4.14 3.37-7.488 7.51-7.488H157.25c.053 0 .106.006.158.02 4.186 2.42 1.97 156.94-.065 157.024-79.047 3.21-66.856-23.465-48.58-23.465 13.99 0 11.96 23.917-49.414 23.917-1.99-40.092-1.208-81.477 0-126.132h80.878c2.65 35.815 2.583 68.402 0 98" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="transparent" fill-rule="evenodd"/>'
                }
            })).render(this.element);
        }
    }
});


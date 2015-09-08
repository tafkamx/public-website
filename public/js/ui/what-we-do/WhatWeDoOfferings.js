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
                    description : 'Systems that provide utility. They can live on the web, desktops or stationed digital devices like touch-screen kiosks. Check out what we did for Mideast Youth on CrowdVoice.by.',
                    svgId : 'svg-cloud-stroke',
                    svgGrad : 'gradient-1'
                }
            })).render(this.element);

            this.appendChild(new EM.UI.WhatWeDoOffering({
                name : 'e-commerce',
                data : {
                    title : 'E-Commerce',
                    description : 'Shopping experiences online that increase sales for our partners and feel good for the consumers. Check out what we did for PC México.',
                    svgId : 'svg-commerce-stroke',
                    svgGrad : 'gradient-2'
                }
            })).render(this.element);

            this.appendChild(new EM.UI.WhatWeDoOffering({
                name : 'brand-development',
                data : {
                    title : 'Brand Development',
                    description : 'Brand systems and narratives to give our partners a unique, cohesive and congruent identity in highly competitive markets. Check out what we did for Taxa.',
                    svgId : 'svg-brand-stroke',
                    svgGrad : 'gradient-3'
                }
            })).render(this.element);

            this.appendChild(new EM.UI.WhatWeDoOffering({
                name : 'mobile',
                data : {
                    title : 'Mobile',
                    description : 'Connect our partners with their consumers on any of their mobile devices, whether it’s a smartphone, tablet or smart watch.',
                    svgId : 'svg-mobile-stroke',
                    svgGrad : 'gradient-4'
                }
            })).render(this.element);
        }
    }
});


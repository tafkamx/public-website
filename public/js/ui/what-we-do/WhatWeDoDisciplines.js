Class(EM.UI, 'WhatWeDoDisciplines').inherits(Widget)({
    ELEMENT_CLASS : 'what-we-do__disciplines -rel',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);
            this._setup();
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.WhatWeDoDiscipline({
                name : 'insights',
                data : {
                    title : 'Insights & Planning',
                    description : 'Strategic thinking. Open to greater comprehension and understanding of what our partners intend, we develop solutions that bring innovation from the present to the future they want.'
                }
            })).render(this.element);

            this.appendChild(new EM.UI.WhatWeDoDiscipline({
                name : 'analytics',
                data : {
                    title : 'Analytics',
                    description : 'We take data from our partners, analyse it and apply it to what we are doing to help make our work smarter and more effective. We want the best results. Badly'
                }
            })).render(this.element);

            this.appendChild(new EM.UI.WhatWeDoDiscipline({
                name : 'visual-design',
                data : {
                    title : 'Visual Design',
                    description : 'What people respond to the most because of its highly visible character. Typography, photography, color, composition and layout. Image making that says the most possible.'
                }
            })).render(this.element);

            this.appendChild(new EM.UI.WhatWeDoDiscipline({
                name : 'interaction-design',
                data : {
                    title : 'Interaction Design',
                    description : 'We’re skilled in creating intuitive interfaces that communicate with people. Designed to work in ways they easily understand, learn and respond positively to.'
                }
            })).render(this.element);

            this.appendChild(new EM.UI.WhatWeDoDiscipline({
                name : 'technology',
                data : {
                    title : 'Technology',
                    description : 'The scientific method in all its glory. Research, plan and code to build our partners’ visions. An overwhelming experience to take and combine proven technologies in novel ways.'
                }
            })).render(this.element);

            this.appendChild(new EM.UI.WhatWeDoDiscipline({
                name : 'quality-assurance',
                data : {
                    title : 'Quality Assurance',
                    description : 'We invest a great deal to ensure that everything that comes out of our ovens works as envisioned. Remove any kind of friction during the consumer’s journey to accomplish the objectives.'
                }
            })).render(this.element);
        }
    }
});

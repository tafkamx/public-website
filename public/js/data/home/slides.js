var CONSTANTS = require('./../../lib/const');

module.exports = [
    {
        MENU_COLOR : CONSTANTS.COLORS.green,
        className : 'slides__intro',
        title : {
            text : 'Hello! We are Empathia',
            className : '-font-extra-light'
        },
        message : {
            text : 'Believe in a world where things work better.'
        },
        cta : {
            text : 'Learn What We Do',
            link : EM.Views.WhatWeDo.PATH
        }
    }

    /*
    {
        MENU_COLOR : CONSTANTS.COLORS.red,
        className : 'slides__cv-org',
        gradient : '-gradient-gray',
        bg : {
            image: '/img/views/home/slides/02.jpg'
        },
        title : {
            text : 'CrowdVoice.org',
            className : '-ttu -font-light'
        },
        message : {
            text : 'Amplifying social justice movements worldwide.'
        },
        cta : {
            text : 'Visit Website',
            link : 'http://crowdvoice.org/',
            external : true
        }
    }*/

    /*
    {
        MENU_COLOR : CONSTANTS.COLORS.orange,
        className : 'slides__cv-by',
        gradient : '-gradient-tm',
        bg : {
            image: '/img/views/home/slides/03.jpg'
        },
        title : {
            text : 'CrowdVoice.by',
            className : '-ttu -font-light'
        },
        message : {
            text : 'Broadcast messages, raise awareness and invite change.'
        },
        cta : {
            text : 'View Case Study',
            link : EM.Views.CaseStudies.PATH
        }
    }
    */
];

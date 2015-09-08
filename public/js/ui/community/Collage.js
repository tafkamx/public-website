var Capitalize = require('./../../lib/utils/capitalize');

Class(EM.UI, 'Collage').inherits(Widget)({
    create : function create(config) {
        var type = Capitalize(config.type);
        return new EM.UI['Collage' + type](config);
    }
});

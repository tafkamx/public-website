var path = require('path');
var _ = require('lodash');

var GeneralApplicationMailer = Class('GeneralApplicationMailer').inherits(BaseMailer)({
  new : function(params) {
    var template = path.join(process.cwd(), 'views', 'mailers', 'generalApplication.html');

    var options = {
      from : 'general-application@empathia.agency',
      to : 'hr@empathia.agency',
      subject : 'New entry from General Job Application',
      html : this._compileTemplate(template, {params : params})
    }

    return this._send(options);
  }
});

module.exports = GeneralApplicationMailer;

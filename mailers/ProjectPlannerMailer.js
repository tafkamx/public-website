var path = require('path');
var _ = require('lodash');

var ProjectPlannerMailer = Class('ProjectPlannerMailer').inherits(BaseMailer)({
  new : function(params) {
    var template = path.join(process.cwd(), 'views', 'mailers', 'projectPlanner.html');

    var options = {
      from : 'project-planner@empathia.agency',
      to : 'partners@empathia.agency',
      subject : 'New entry form Project Planner',
      html : this._compileTemplate(template, {params : params})
    }

    return this._send(options);
  }
});

module.exports = ProjectPlannerMailer;

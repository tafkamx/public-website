var mandrill = require('mandrill-api/mandrill');
var client = new mandrill.Mandrill(CONFIG.mandrill.key || false)

var message = {
  "html" : "",
  "subject" : "New entry form Project Planner",
  "from_email" : "project-planner@empathia.agency",
  "from_name"  : "Empathia Project Planner",
  "to" : [],
  "important" : true,
  "auto_text" : true,
  "inline_css": true,
}

var ProjectPlannerMailer = Module('ProjectPlannerMailer')({
  new : function(params, callback) {
    var mailer = this;

    var viewFile = fs.readFileSync('./views/mailers/projectPlanner.html', 'utf-8');

    var template = new Thulium({
      template : viewFile
    });


    template.parseSync().renderSync({params : params});

    console.log(template.view)

    var view = template.view;

    message.html = view;
    message.to = [];

    message.to.push({
      "email" : 'hello@empathya.agency',
      "name" : 'Empathya',
      "type" : "to"
    });

    client.messages.send({
      "message" : message,
      "async" : true
    }, function(result) {
      logger.log('ProjectPlannerMailer.new()');
      logger.log(result);

      callback(null, result)
    }, function(err) {
      logger.error('A mandrill error ocurred:');
      logger.error(err.name + ' -  ' + err.message);
      logger.error(err.stack);
      callback(err);
    });
  }
});

module.exports = ProjectPlannerMailer;

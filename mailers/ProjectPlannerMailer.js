var mandrill = require('mandrill-api/mandrill');
var client = new mandrill.Mandrill(CONFIG.mandrill.key || false)

var message = {
  "html" : "",
  "subject" : "",
  "from_email" : "notifications@crowdvoice.by",
  "from_name"  : "CrowdVoice.by",
  "to" : [],
  "important" : true,
  "auto_text" : true,
  "inline_css": true,
}

var ProjectPlannerMailer = Module('ProjectPlannerMailer')({
  new : function(callback) {
    var mailer = this;

    var viewFile = fs.readFileSync('...');

    var template = new Thulium({
      template : viewFile
    });

    template.parseSync().renderSync({});

    var view = template.view;

    message.html = view;
    message.to = [];

    message.to.push({
      "email" : ,
      "name" : ,
      "type" : "to"
    });

    var ipPool = "Main Pool";

    client,messages.send({
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
})

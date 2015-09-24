var mandrill = require ('mandrill-api/mandrill');
var client = new mandrill.Mandrill(CONFIG.mandrill.key || false);

var message = {
  "html" : "",
  "subject" : "New entry from General Job Application",
  "from_email" : "general-application@empathia.agency",
  "from_name" : "Empathia General Application",
  "to" : [],
  "important" : true,
  "auto_text" : true,
  "inline_css": true
}

var generalApplicationMailer = Module ('generalApplicationMailer')({
  new : function(params, callback){
    var mailer = this;

    var viewFile = fs.readFileSync('./views/mailers/generalApplication.html','utf-8');

    var template = new Thulium ({
      template : viewFile
    });

    template.parseSync().renderSync({params : params});

    var view = template.view;

    message.html = view;
    message.to = [];

    message.to.push({
      "email" : 'sergio@delagarza.io',
      "name"  : 'Empathia',
      "type"  :  "to"
    });

    message.from_email = params.inputEmail;

    client.messages.send({
      "message" : message,
      "async"   : true,
    }, function(result){
      logger.log('generalApplicationMailer.new()');
      logger.log(result);

      callback(null, result);
    }, function(err){
      logger.error('A mandrill error ocurred: ');
      logger.error(err.name + ' -  ' + err.message);
      logger.error(err.stack);
      callback(err);
    });
  }
});

module.exports = generalApplicationMailer;
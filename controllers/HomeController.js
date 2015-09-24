/* globals application */
function microtime(get_as_float) {
  //  discuss at: http://phpjs.org/functions/microtime/
  // original by: Paulo Freitas
  //   example 1: timeStamp = microtime(true);
  //   example 1: timeStamp > 1000000000 && timeStamp < 2000000000
  //   returns 1: true

  var now = new Date()
    .getTime() / 1000;
  var s = parseInt(now, 10);

  return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
}

var ProjectPlannerMailer = require('./../mailers/ProjectPlannerMailer');
var generalApplicationMailer = require ('./../mailers/generalApplicationMailer');


var HomeController = Class('HomeController')({
  prototype : {
    init : function (){
      this._initRouter();
      return this;
    },

    _initRouter : function() {
      application.router.route('/sendProject')
        .post(this.sendProject);

      application.router.route('/sendApplication')
        .post(this.sendApplication);

      application.router.route('/*')
        .get(this.index);
    },

    index : function(req, res) {
      res.render('home/index.html', {layout : 'application'});
    },

    sendProject : function(req, res, next) {
      var file = fs.readFileSync(req.files.file.path);

      var params = {
        Bucket: 'empathia-ppn-uploads',
        Key: microtime(true) * 10000 + '_' + req.files.file.name,
        Body: file
      };

      amazonS3.upload(params, function(err, data) {
        if (err) {
          return next(err);
        }

        var fileURL = data.Location;

        var body = req.body;
        body.fileURL = fileURL;

        ProjectPlannerMailer.new(body, function(err, response) {
          if (err) {
            return next(err);
          }

          res.json({data : response });
        });
      });
    },
    sendApplication : function (req, res, next){
      if(!req.files.file){
        req.body.fileURL = '';

        generalApplicationMailer.new(req.body, function(err, response){
          if (err){
            return next(err);
          }

          return res.json({data : response});
        });
      } else {
        var file = fs.readFileSync(req.files.file.path);

        var params = {
          Bucket: 'empathia-ppn-uploads',
          Key: req.files.file.name,
          Body:file
        };
              amazonS3.upload(params, function(err, data){
                if(err){
                  return next(err);
                }

                var fileURL = data.Location;

                var body =req.body;
                body.fileURL = fileURL;

                generalApplicationMailer.new(body, function(err, response){
                  if (err){
                    return next(err);
                  }

                  res.json({data : response});
                });
              });
      }
    }
  }
});

module.exports = new HomeController();

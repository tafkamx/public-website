/* globals application, amazonS3 */
var ProjectPlannerMailer = require('./../mailers/ProjectPlannerMailer');
var GeneralApplicationMailer = require ('./../mailers/GeneralApplicationMailer');
var zip = require("node-native-zip");

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
      if (!req.files.file) {
        req.body.fileURL = '';

        ProjectPlannerMailer.new(req.body).then(function(response) {
          return res.json({data : response });
        }).catch(next);

      } else {
        var archive = new zip();
        var files = [];

        if (req.files.file instanceof Array === false) {
          req.files.file = [req.files.file];
        }

        var zipName = (Date.now() + '-' + req.files.file.map(function(file) {
          return file.name[0];
        }).join(''));

        req.files.file.forEach(function (file) {
          files.push({name: file.name, path: file.path});
        });

        archive.addFiles(files, function() {
          var buffer = archive.toBuffer();

          var params = {
            Bucket: 'empathia-ppn-uploads',
            Key: zipName + '.zip',
            Body: buffer
          };

          amazonS3.upload(params, function(err, data) {
            if (err) {
              return next(err);
            }

            var fileURL = data.Location;
            var body = req.body;

            body.fileURL = fileURL;

            ProjectPlannerMailer.new(body).then(function(response) {
              res.json({data: response});
            }).catch(next);

          });
        }, function(err) {
          if (err) {
            return next(err);
          }
        });
      }
    },

    sendApplication : function (req, res, next){
      if (!req.files.file) {
        req.body.fileURL = '';

        GeneralApplicationMailer.new(req.body).then(function(response) {
          return res.json({data : response});
        }).catch(next);

      } else {
        var archive = new zip();
        var files = [];

        if (req.files.file instanceof Array === false) {
          req.files.file = [req.files.file];
        }

        var zipName = (Date.now() + '-' + req.files.file.map(function(file) {
          return file.name[0];
        }).join(''));

        req.files.file.forEach(function (file) {
          files.push({name: file.name, path: file.path});
        });

        archive.addFiles(files, function() {
          var buffer = archive.toBuffer();

          var params = {
            Bucket: 'empathia-ppn-uploads',
            Key: zipName + '.zip',
            Body: buffer
          };

          amazonS3.upload(params, function(err, data) {
            if(err) {
              return next(err);
            }

            var fileURL = data.Location;
            var body =req.body;

            body.fileURL = fileURL;

            GeneralApplicationMailer.new(body).then(function(response) {
              res.json({data : response});
            }).catch(next);

          });
        }, function(err) {
          if (err) {
            next(err);
          }
        });
      }
    }
  }
});

module.exports = new HomeController();

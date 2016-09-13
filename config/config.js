var env = process.env.NODE_ENV || 'development';

var config = {
  appName : 'Empathya',
  environment : env,
  logFile : './log/' + env + '.log',
  port            : process.env.PORT || 3000,
  enableLithium   : false,
  enableHashids   : false, // https://github.com/hashids/
  enablePassport  : false,
  sessionKey      : 'session',
  sessionSecret   : 'Am6Vte8CDjm7}trKgQsMuN69',
  enableRedis     : false,
  siteUrl : {
    production: 'http://empathya.agency',
    staging : 'http://protos.empathya.agency',
    development : 'http://localhost:3000'
  },

  mailer : {
    sendEmails : true,
    mailgun: {
      auth: {
        api_key: 'key-91f243248028b811b5893fc1bfea1042',
        domain: 'empathia.agency',
      },
    }
  },

  s3 : {
    accessKeyId: 'AKIAJGCOQED4N2MM2AIA',
    secretAccessKey: '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'
  }
};

module.exports = config;

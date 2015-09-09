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
    staging : 'http://protos.empathya.agency'
    development : 'http://localhost:3000'
  }
};

module.exports = config;

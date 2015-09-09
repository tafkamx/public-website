{
  /**
   * This is a sample configuration file for PM2
   */

  /**
   * Here we declare the apps that must be managed by PM2
   * All options are listed here:
   * https://github.com/Unitech/PM2/blob/master/ADVANCED_README.md#json-app-declaration
   *
   */
  apps : [

    // First application
    {
      name      : "empathya",
      script    : "bin/server.js",
      env_production : {
        NODE_ENV: "staging"
      }
    }
  ],


  /**
   * PM2 help you to deploy apps over your servers
   * For more help go to :
   * https://github.com/Unitech/PM2/blob/master/ADVANCED_README.md#deployment-pm2--090
   */
  deploy : {
    staging : {
      user : "deploy",
      host : "empathya.agency",
      ref  : "origin/master",
      repo : "git@github.com:Empathya/empathya.agency.git",
      path : "/home/deploy/empathya_staging",
      "post-deploy" : "npm install && webpack -p && pm2 startOrRestart ecosystem.js --env staging",
      env  : {
        NODE_ENV: "staging"
      }
    }
  }
}

// Custom Errors
global.NotFoundError = function NotFoundError(message) {
  this.name = 'NotFoundError';
  this.message = message || 'Not Found';
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

// Load LithiumEngine
if (CONFIG.enableLithium) {
  require('./LithiumEngine.js');
}

var AWS = require('aws-sdk');
global.amazonS3 = new AWS.S3(CONFIG.s3);

require(path.join(process.cwd(), 'lib', 'BaseMailer.js'));

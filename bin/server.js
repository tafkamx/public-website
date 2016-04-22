#!/usr/bin/env node

var path = require('path');

var application = require('neonode-core');

var nodemailer = require('nodemailer');
var mailgun = require('nodemailer-mailgun-transport');

var transport = mailgun(CONFIG.mailer.mailgun);

BaseMailer.transport(nodemailer.createTransport(transport));

application._serverStart();

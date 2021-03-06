const log4js = require('log4js');
const log4js_extend = require('log4js-extend');
const logger_config = require('../logger_config.json');


log4js.configure(logger_config);
 
log4js_extend(log4js, {
  path: null,
  format: '[@name @file:@line:@column]'
});
 
const logger = log4js.getLogger('[Client]');
const httpLogger = log4js.getLogger('[HTTP]');
logger.info('Logger Enabled');

exports.logger = logger;
exports.httpLogger = httpLogger;


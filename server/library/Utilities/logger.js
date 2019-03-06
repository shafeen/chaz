const debug = require('debug');
module.exports = {
    error: debug('error'),
    warn: debug('warn'),
    info: debug('info'),
    verbose: debug('verbose'),
    debug: debug('debug'),
    silly: debug('silly'),
};

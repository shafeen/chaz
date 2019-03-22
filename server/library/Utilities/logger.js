const bottle = require('bottlejs')('basicmean');
bottle.service('logger', __, 'debug');
function __(debug) {
    return {
        error: debug('error'),
        warn: debug('warn'),
        info: debug('info'),
        verbose: debug('verbose'),
        debug: debug('debug'),
        silly: debug('silly'),
    }
}
module.exports = __;

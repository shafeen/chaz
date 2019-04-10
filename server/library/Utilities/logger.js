module.exports = {
    name: 'logger', service: __, dependencies: [ 'debug' ]
};

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

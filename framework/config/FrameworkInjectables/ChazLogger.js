module.exports = {
    name: 'ChazLogger', service: __, dependencies: [ 'require(debug)' ]
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

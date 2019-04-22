module.exports = {
    name: 'ChazLogger', service: __, dependencies: [ 'require(debug)' ]
};

function __(debug) {
    const LogDecorators = {
        addISODatePrefix(loggerObject) {
            return function decoratedLoggerObject() {
                const formattedLogMsg = arguments[0];
                arguments[0] = `[${new Date().toISOString()}] ${formattedLogMsg}`;
                return loggerObject(...arguments);
            };
        }
    };

    return {
        error: LogDecorators.addISODatePrefix(debug('error')),
        warn: LogDecorators.addISODatePrefix(debug('warn')),
        info: LogDecorators.addISODatePrefix(debug('info')),
        verbose: LogDecorators.addISODatePrefix(debug('verbose')),
        debug: LogDecorators.addISODatePrefix(debug('debug')),
        silly: LogDecorators.addISODatePrefix(debug('silly')),
    }
}

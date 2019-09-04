module.exports = {
    name: 'TaskScheduler', service: __, dependencies: [],
};

function __() {

    const defaultConfig = {
        delay: 1000, runOnceFirst: false, runOnlyOnce: false
    };

    const validateConfig = function (config) {
        if (!Number.isInteger(config.delay) || config.delay < 1) {
            throw new Error(
            `${this.constructor.name}: invalid delay value ${config.delay}`
            );
        } else if (typeof config.runOnceFirst !== 'boolean') {
            throw new Error(
            `${this.constructor.name}: invalid runOnceFirst value ${config.runOnceFirst}`
            );
        } else if (typeof config.runOnlyOnce !== 'boolean') {
            throw new Error(
            `${this.constructor.name}: invalid runOnlyOnce value ${config.runOnlyOnce}`
            );
        } else {
            return true;
        }
    };

    class TaskScheduler {
        constructor() {
            const self = this;

            const config = self.config();
            config.delay = config.delay || defaultConfig.delay;
            config.runOnceFirst = config.runOnceFirst || defaultConfig.runOnceFirst;
            config.runOnlyOnce = config.runOnlyOnce || defaultConfig.runOnlyOnce;

            validateConfig(config);
            if (config.runOnlyOnce) {
                setTimeout(function() {
                    self.run.apply(self);
                }, config.delay);
            } else if (config.runOnceFirst) {
                self.run.apply(self);
                setInterval(function() {
                    self.run.apply(self);
                }, config.delay);
            } else {
                setInterval(function() {
                    self.run.apply(self);
                }, config.delay);
            }
        }

        config() {
            return {
                delay: defaultConfig.delay,
                runOnceFirst: defaultConfig.runOnceFirst,
                runOnlyOnce: defaultConfig.runOnlyOnce,
            }
        }

        /** @return {void} */
        run() {
            throw new Error( `TaskScheduler.run() must be overridden by the child class "${this.constructor.name}"!`)
        }

    }

    return TaskScheduler;
}

module.exports = {
    name: 'ApplicationRunner', service: __, dependencies: ['logger'],
};

function __(logger) {

    class ApplicationRunner {
        constructor() {
            this.order();
        }

        /** @return {void} */
        run() {
            throw new Error( `ApplicationRunner.run() must be overridden by the child class "${this.constructor.name}"!`)
        }

        /** @return {int} */
        order() {
            logger.warn(
                `Returning the default order (1) for ApplicationRunner class "${this.constructor.name}". ` +
                'This is usually fine but you might want to change this if you ' +
                'have multiple ApplicationRunner subclasses you want to control the order of.'
            );
            return 1;
        }

    }

    return ApplicationRunner;
}

module.exports = {
    name: 'ApplicationRunner', service: __, dependencies: ['ChazLogger'],
};

function __(Logger) {

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
            Logger.warn(
                `Using default order (1) for ApplicationRunner class "${this.constructor.name}". ` +
                'This is usually fine but you might want to change this if you ' +
                'have multiple ApplicationRunner subclasses you want to control the order of.'
            );
            return 1;
        }

    }

    return ApplicationRunner;
}

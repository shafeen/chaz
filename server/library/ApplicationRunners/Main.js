module.exports = {
    name: "Main", service: __,
    dependencies: ['ApplicationRunner', 'logger']
};

function __(ApplicationRunner, logger) {

    class Main extends ApplicationRunner {
        order() {return 0;}

        run() {
            logger.warn(`Starting sample ApplicationRunner class '${this.constructor.name}'`);
        }

    }

    return Main;
}
module.exports = {
    name: "Main", service: __,
    dependencies: ['ApplicationRunner', 'logger', 'resource(settings/settings.json)']
};

function __(ApplicationRunner, logger, settings) {

    class Main extends ApplicationRunner {
        order() {return 0;}

        run() {
            logger.warn(`Starting sample ApplicationRunner class '${this.constructor.name}'`);
            logger.warn(settings.msg);
        }

    }

    return Main;
}
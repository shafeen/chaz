module.exports = {
    name: "Main", service: __,
    dependencies: ['ApplicationRunner', 'ChazLogger', 'resource(settings/settings.json)']
};

function __(ApplicationRunner, Logger, settings) {

    class Main extends ApplicationRunner {
        order() {return 0;}

        run() {
            Logger.warn(`Starting sample ApplicationRunner class '${this.constructor.name}'`);
            Logger.warn(settings.msg);
        }

    }

    return Main;
}
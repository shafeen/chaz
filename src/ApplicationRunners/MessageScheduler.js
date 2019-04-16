module.exports = {
    name: "MessageScheduler", service: __,
    dependencies: ['TaskScheduler', 'ChazLogger']
};

function __(TaskScheduler, Logger) {

    class MessageScheduler extends TaskScheduler {
        config() {return { delay: 1000 };}

        run() {
            Logger.warn(`Running sample TaskScheduler class '${this.constructor.name}'`);
        }

    }
    return MessageScheduler;
}
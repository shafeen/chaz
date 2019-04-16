module.exports = {
    name: "AppRunner1", service: __,
    dependencies: ['ApplicationRunner', 'AppRunner1Verifier']
};

function __(ApplicationRunner, AppRunner1Verifier) {

    class AppRunner1 extends ApplicationRunner {
        order() {return 0;}

        run() {
            AppRunner1Verifier.runCount++;
        }

    }

    return AppRunner1;
}
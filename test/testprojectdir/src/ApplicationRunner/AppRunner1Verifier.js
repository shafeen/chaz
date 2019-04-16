module.exports = {
    name: "AppRunner1Verifier", service: __,
    dependencies: []
};

// This style of service is created for testing only
// so we can verify ApplicationRunner run counts
function __() {
    const AppRunner1Verifier = {
        runCount: 0
    };
    return AppRunner1Verifier;
}
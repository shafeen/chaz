const assert = require('chai').assert;
const path = require('path');
const ROOT_PROJECT_DIRECTORY = path.join(__dirname, '..', 'testprojectdir');

describe('ApplicationRunner integration test', function () {

    let container = null;

    it('ApplicationRunners should run once after framework initialized', function () {
        const diContainer = require(`${ROOT_PROJECT_DIRECTORY}/../../framework/config/diContainer.js`);
        container = diContainer.initialize(ROOT_PROJECT_DIRECTORY);

        const { AppRunner1Verifier } = container;
        const runCountBefore = AppRunner1Verifier.runCount;
        assert.equal(runCountBefore, 0);
        diContainer.setupApplicationRunners(); // ApplicationRunners should run now
        const runCountAfter = AppRunner1Verifier.runCount;
        assert.equal(runCountAfter, runCountBefore + 1);
    });


});
const assert = require('chai').assert;
const path = require('path');
const ROOT_PROJECT_DIRECTORY = path.join(__dirname, '..', 'testprojectdir');

describe('Autoscanning src/ directory integration test', function () {

    let container = null;

    before(function () {
        const chaz = require(`${ROOT_PROJECT_DIRECTORY}/run.js`);
        container = chaz.initialize({rootProjectAbsolutePath: ROOT_PROJECT_DIRECTORY});
    });

    it('framework should be able to inject simple Components in the src/ root directory', function () {
        const { IntegrationTestOnlyInjectableClass } = container;
        assert.equal(
            require(`${ROOT_PROJECT_DIRECTORY}/src/IntegrationTestOnlyInjectableClass.js`).service(),
            IntegrationTestOnlyInjectableClass
        );
    });

    it('framework should be able to detect Components in the src/ directory recursively and inject them', function () {
        const { IntegrationTestOnlyInjectableClassNested } = container;
        assert.equal(
            require(`${ROOT_PROJECT_DIRECTORY}/src/nested-level-one/IntegrationTestOnlyInjectableClassNested.js`).service(),
            IntegrationTestOnlyInjectableClassNested
        );
    });

});
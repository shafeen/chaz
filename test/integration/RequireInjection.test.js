const assert = require('chai').assert;
const path = require('path');
const ROOT_PROJECT_DIRECTORY = path.join(__dirname, '..', 'testprojectdir');

describe('require(<module_name>) integration test', function () {

    let container = null;
    const modulesToTestWithRequire = ['mocha', 'chai'];

    before(function () {
        const chaz = require(`${ROOT_PROJECT_DIRECTORY}/run.js`);
        container = chaz.initialize({rootProjectAbsolutePath: ROOT_PROJECT_DIRECTORY});
    });

    it('framework should be able to inject modules installed in node_modules/ directory', function () {
        const { TestRequireService } = container;
        modulesToTestWithRequire.forEach(moduleName =>
            assert.equal(require(moduleName), TestRequireService[moduleName])
        );
    });

});
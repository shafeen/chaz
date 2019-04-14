const assert = require('chai').assert;
const path = require('path');
const ROOT_PROJECT_DIRECTORY = path.join(__dirname, '..', 'testprojectdir');
const PROJECT_RESOURCE_DIRECTORY = path.join(ROOT_PROJECT_DIRECTORY, 'resources');

describe('resource(<resource_name>) integration test', function () {

    let container = null;

    before(function () {
        const chaz = require(`${ROOT_PROJECT_DIRECTORY}/run.js`);
        container = chaz.initialize({rootProjectAbsolutePath: ROOT_PROJECT_DIRECTORY});
    });

    it('framework should be able to inject a basic resource in the resources/ directory path', function () {
        const expected = require(`${PROJECT_RESOURCE_DIRECTORY}/test.json`);
        const actual = container.TestResourceService.testResource;
        assert.equal(actual, expected);
    });

    it('framework should be able to inject a nested resource in the resources/ directory path', function () {
        const expected = require(`${PROJECT_RESOURCE_DIRECTORY}/nested-level-one/test.json`);
        const actual = container.TestResourceService.nestedLevelOneResource;
        assert.equal(actual, container.TestResourceService.nestedLevelOneResource);
    });

});
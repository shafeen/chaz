module.exports = {
    name: 'TestResourceService', service: __,
    dependencies: ['resource(test.json)', 'resource(nested-level-one/test.json)']
};

function __(testResource, nestedLevelOneResource) {
    class TestResourceService{}
    TestResourceService.testResource = testResource;
    TestResourceService.nestedLevelOneResource = nestedLevelOneResource;

    return TestResourceService;
}
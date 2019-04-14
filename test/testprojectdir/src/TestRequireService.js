module.exports = {
    name: 'TestRequireService', service: __,
    dependencies: ['require(mocha)', 'require(chai)']
};

function __(mocha, chai) {
    class TestRequireService{}
    TestRequireService.mocha = mocha;
    TestRequireService.chai = chai;

    return TestRequireService;
}
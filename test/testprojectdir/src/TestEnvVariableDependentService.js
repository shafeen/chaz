module.exports = {
    name: 'TestEnvVariableDependentService', service: __,
    dependencies: ['env(TEST_ENV_VARIABLE_NAME1)', 'env(TEST_ENV_VARIABLE_NAME2)']
};

function __(TEST_ENV_VARIABLE_NAME1, TEST_ENV_VARIABLE_NAME2) {
    class TestEnvVariableDependentService{}
    TestEnvVariableDependentService.TEST_ENV_VARIABLE_NAME1 = TEST_ENV_VARIABLE_NAME1;
    TestEnvVariableDependentService.TEST_ENV_VARIABLE_NAME2 = TEST_ENV_VARIABLE_NAME2;

    return TestEnvVariableDependentService;
}
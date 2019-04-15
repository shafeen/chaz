const assert = require('chai').assert;
const path = require('path');
const ROOT_PROJECT_DIRECTORY = path.join(__dirname, '..', 'testprojectdir');

describe('env(<ENV_VARIABLE_NAME>) integration test', function () {

    let container = null;

    const TEST_ENV_VARIABLE_NAME1 = 'TEST_ENV_VARIABLE_NAME1';
    const TEST_ENV_VARIABLE_NAME2 = 'TEST_ENV_VARIABLE_NAME2';
    let envVariableValues = new Map();
    envVariableValues.set(TEST_ENV_VARIABLE_NAME1, 'test_env_variable_value_1');
    envVariableValues.set(TEST_ENV_VARIABLE_NAME2, 'test_env_variable_value_2');

    const envVariablesToRequest = [`env(${TEST_ENV_VARIABLE_NAME1})`, `env(${TEST_ENV_VARIABLE_NAME2})`];

    before(function () {
        // initialize environment variables for injection testing
        envVariablesToRequest.forEach(dependencyName => {
            const envVariablesToInjectRegex = /^env\(\s*(.*)\s*\)$/;
            const envVariableName = envVariablesToInjectRegex.exec(dependencyName)[1];
            process.env[envVariableName] = envVariableValues.get(envVariableName);
        });
        // bootstraps the framework
        const chaz = require(`${ROOT_PROJECT_DIRECTORY}/run.js`);
        container = chaz.initialize({rootProjectAbsolutePath: ROOT_PROJECT_DIRECTORY});
    });

    it('framework should be able to inject environment variables as dependencies', function () {
        const { TestEnvVariableDependentService } = container;
        envVariableValues.forEach((envVariableValue, envVariableName) =>
            assert.equal(
                TestEnvVariableDependentService[envVariableName],
                process.env[envVariableName]
            )
        );
    });

});

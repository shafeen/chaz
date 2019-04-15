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
            require(`${ROOT_PROJECT_DIRECTORY}/src/IntegrationTestOnlyInjectableClass.js`)
                .service().objectInInjectableClosure,
            IntegrationTestOnlyInjectableClass.objectInInjectableClosure
        );
    });

    it('framework should be able to inject Components in the autoscanned src/ directory ' +
       'even if they were registered with extra whitespaces their in name',
        function () {
            const { IntegrationTestOnlyInjectableClass_ExtraWhitespaceInRegistryName } = container;
            assert.equal(
                require(`${ROOT_PROJECT_DIRECTORY}/src/IntegrationTestOnlyInjectableClass_ExtraWhitespaceInRegistryName.js`)
                    .service().objectInInjectableClosure,
                IntegrationTestOnlyInjectableClass_ExtraWhitespaceInRegistryName.objectInInjectableClosure
            );
        }
    );

    it('framework should be able to detect Components in the src/ directory recursively and inject them', function () {
        const { IntegrationTestOnlyInjectableClassNested } = container;
        assert.equal(
            require(`${ROOT_PROJECT_DIRECTORY}/src/nested-level-one/IntegrationTestOnlyInjectableClassNested.js`)
                .service().objectInInjectableClosure,
            IntegrationTestOnlyInjectableClassNested.objectInInjectableClosure
        );
    });

    it('framework should be able to inject one Component into another if requested in dependencies', function () {
        const { IntegrationTestOnlyInjectableClass } = container;
        assert.equal(
            IntegrationTestOnlyInjectableClass.objectInDependencyInjectableClosure,
            require(`${ROOT_PROJECT_DIRECTORY}/src/nested-level-one/IntegrationTestOnlyInjectableClassNested.js`)
                .service().objectInInjectableClosure
        );
    });

    it('framework should be able to inject one Component into another even if dependency name has extra surrounding whitespace',
        function () {
            const { IntegrationTestOnlyInjectableClass_ExtraWhitespaceInDependencyName } = container;
            assert.equal(
                IntegrationTestOnlyInjectableClass_ExtraWhitespaceInDependencyName.objectInDependencyInjectableClosure,
                require(`${ROOT_PROJECT_DIRECTORY}/src/nested-level-one/IntegrationTestOnlyInjectableClassNested.js`)
                    .service().objectInInjectableClosure
            );
        }
    );

});
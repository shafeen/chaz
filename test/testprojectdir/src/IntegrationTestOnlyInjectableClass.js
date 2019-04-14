module.exports = {
    name: 'IntegrationTestOnlyInjectableClass', service: __,
    dependencies: ['IntegrationTestOnlyInjectableClassNested']
};

// ----------------
// ***** NOTE *****
// ----------------
// This style of service constructor was created ONLY for integration
// testing injection logic, it isn't expected that users will typically
// return closure objects in this way (although they have the option to
// do so, it would be an antipattern).
const objectInInjectableClosure = {message: 'test object in the injectable\'s closure'};
function __(IntegrationTestOnlyInjectableClassNested) {
    return {
        objectInInjectableClosure: objectInInjectableClosure,
        objectInDependencyInjectableClosure: IntegrationTestOnlyInjectableClassNested?
            IntegrationTestOnlyInjectableClassNested.objectInInjectableClosure : null
    };
}
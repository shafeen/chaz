module.exports = {
    name: 'IntegrationTestOnlyInjectableClass', service: __, dependencies: []
};

// ----------------
// ***** NOTE *****
// ----------------
// This style of service constructor was created ONLY for integration
// testing injection logic, it isn't expected that users will typically
// return a closure object in this way (although they have the option to
// do so, it would be an antipattern).
const objectInInjectableClosure = {message: 'test object in the injectable\'s closure'};
function __() {
    return objectInInjectableClosure;
}
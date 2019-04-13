chaz :smirk_cat: 
---
> Simple and powerful

[![Build Status](https://travis-ci.org/shafeen/basicMEAN.svg?branch=master)](https://travis-ci.org/shafeen/basicMEAN)

##### An lightweight and gently opinionated framework to use for your applications.

---

#### Dependency Injection Container
All files placed in the `src/` directory is eligible to be autoscanned for the DI container 
provided that an object in the following format is exported by each file:

```javascript
module.exports = {
    // Name you want your module to be known for DI
    name: "ComponentName", 
    
    // Constructor function for your Component, whatever this function
    // returns will registered in the DI registry and will be injected when
    // another component requests this component in its dependency list
    service: serviceConstructorFunction,  
    
    // The DI container will look through its registry and inject these
    // dependencies (with the exact names specified) into the serviceConstructorFunction
    // for this component. They will be injected in the order in this list.
    dependencies: ['dependency1', 'dependency2']
};
```
chaz :smirk_cat: 
---
> Simple and powerful

[![Build Status](https://travis-ci.org/shafeen/chaz.svg?branch=master)](https://travis-ci.org/shafeen/chaz)

##### An lightweight and gently opinionated framework to use for your applications.

---

#### Directory structure and initializing the application

In your project root directory, create the entrypoint `app.js` (you can call it whatever you like), 
and the folders `src/` and `resources/` (the folder names must be exactly "src" and "resources").
```
<project>
   |
   +--src/
   |
   +--resources/
   |
   +--app.js
```

To kick off the application, make sure you have `chaz` installed: `npm i chaz-js`, and then simply
type this into your `app.js` file mentioned above:

```javascript

const chaz = require('chaz-js');
chaz.initialize();
```

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

To inject `require`-ed modules, simply type in the command `"require(<module_name>)"`
in the exported `dependencies` property list (you still need to have them installed 
using `npm install <module_name>`). Notice the lack of quotes around the
`<module_name>` in the dependency list, this is on purpose. 

Example:  
```javascript

module.exports = {
    name: "MyFancyServiceClass", 
    service: __,  
    dependencies: ['require(mongoose)', 'MyService']
};

function __(mongoose, MyService) {
    // mongoose and MyService will be injected usable in this scope
    
    class MyFancyServiceClass {
        constructor() {
            // constructor stuff
        }
        foo() {
            // foo stuff
        }
        bar() {
            // bar stuff
        }
    }
    
    return MyFancyServiceClass;
}

```
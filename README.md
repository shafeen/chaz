chaz :smirk_cat: 
---
> Simple and powerful

[![Build Status](https://travis-ci.org/shafeen/chaz.svg?branch=master)](https://travis-ci.org/shafeen/chaz)

##### A lightweight and gently opinionated framework to use for your applications.

---

#### Installation and Directory structure

Create an empty project directory, init a `package.json` file and install the framework: 
```
npm i chaz-js
```

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

Paste the following into your `app.js` file, it only serves to kick off an application.

```javascript
// app.js

const chaz = require('chaz-js');
chaz.initialize();
```

#### Getting started and initializing an application

Kicking off the application by running your `app.js` (or equivalent file in your project root)
will trigger the framework to search for an `ApplicationRunner` class to run. You may have 
multiple `ApplicationRunner` classes, but most applications will probably stick with just 1.

An `ApplicationRunner` is a simple subclass that extends the `ApplicationRunner` class 
provided by the framework. Let's create a simple one in the `src/` folder:

```javascript
module.exports = {
    name: "Main", service: __, dependencies: ['ApplicationRunner']
};

function __(ApplicationRunner) {
    
    // Application runners should implement 2 methods
    // - order(): return an int to decide run order for multiple ApplicationRunners (if you have more than 1)
    // - run(): contains whatever code you want to run when your application starts
    class Main extends ApplicationRunner {
        order() {return 0;}

        run() {
            console.log(`Starting sample ApplicationRunner class '${this.constructor.name}'`);
        }
    }
    
    return Main;
}
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

**Example**:  
```javascript
module.exports = {
    name: "MyFancyServiceClass", 
    service: __,  
    dependencies: ['require(mongoose)', 'MyService']
};

function __(mongoose, MyService) {
    // mongoose and MyService will be injected and usable in this scope
    
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

#### Special Dependencies
In addition to registered components, the following dependency formats have special meaning when
specified in a component's dependency list:
- `require(<module_name>)`: inject installed module (core or node_modules)
- `resource(<resources_relative_name>)`: get and inject resource from resources/ directory
- `env(<ENV_VARIABLE_NAME>)`: inject environment variable (from `process.env`)

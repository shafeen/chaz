chaz :smirk_cat: 
---
[![Build Status](https://travis-ci.org/shafeen/basicMEAN.svg?branch=master)](https://travis-ci.org/shafeen/basicMEAN)

##### An opinionated project to use for backend applications with a lightweight ui.

---

#### Environment Variables
- `PERSISTENCE_TYPE`
    - possible values [`mongodb`]
- `MONGODB_NETWORK_URL`
    - requires that the `PERSISTENCE_TYPE` environment variable above is set to `mongodb` to have any effect
    - if not set, defaults to `localhost`
- `SESSION_STORE`
    - possible values [`memory`, `redis`]
- `REDIS_NETWORK_URL`
    - requires that the `SESSION_STORE` environment variable is set to `redis` to have any effect
    - if not set, defaults to `localhost`
- `METRICS_PORT`
    - if set, emits prometheus metrics on this port instead of the default `9000`


#### Dependency Injection Container
All files placed in the `server/src/` directory is eligible to be autoscanned for the DI container 
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

#### Metrics
This service emits prometheus metrics on port `9000` by default, set the environment variable `METRICS_PORT` to change that. 


#### Authentication

**POST** : `/authenticate/signup`  
params: `{ email: String, password: String }`

**POST** : `/authenticate/login`  
params: `{ email: String, password: String }` 

**GET** : `/authenticate/logout`  
params: N/A  


#### Rendering partial views
Place template (pug/jade) files for partial pages for modules (ng-views, etc)
in their module folder found in `ng-client/`. For example: all the templates used by the navbar
can be found in `/ng-client/navbar`.

When trying to render a partial view from the client (an ng-include for example), 
use the following address format: `/partials/<module>/<view>`. 
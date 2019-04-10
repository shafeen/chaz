basicMEAN 
---
[![Build Status](https://travis-ci.org/shafeen/basicMEAN.svg?branch=master)](https://travis-ci.org/shafeen/basicMEAN)

##### An opinionated web starter project to use for websites and web applications

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
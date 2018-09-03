basicMEAN 
---

##### An opinionated web starter project to use for websites and web applications

---

#### Environment Variables

- `SESSION_STORE`
    - supports values `memory` and `redis`
- `REDIS_NETWORK_URL`
    - only valid if `SESSION_STORE` is set to `redis`
    - if not set, defaults to `localhost`
- `MONGODB_NETWORK_URL`
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
const session = require('express-session');
const MemoryStore = session.MemoryStore;
const RedisStore = require('connect-redis')(session);

const MEMORY_STORE = 'memory';
const REDIS_STORE = 'redis';

const acceptedSessionStores = new Set([
    REDIS_STORE, MEMORY_STORE
]);

const getSessionStore = function (envSessionStore) {
    if (!acceptedSessionStores.has(envSessionStore)) {
        envSessionStore = MEMORY_STORE;
    }
    switch (envSessionStore) {
        case REDIS_STORE:
            const REDIS_NETWORK_URL = process.env.REDIS_NETWORK_URL || 'localhost';
            console.log(`Using a ${REDIS_NETWORK_URL} redis session store`);
            return new RedisStore({
                host: REDIS_NETWORK_URL, port: 6379, ttl: 60*15
            });
            break;
        case MEMORY_STORE:
        default:
            console.log('Using a leaky in-memory session store (development only)');
            return new MemoryStore();
    }
};

module.exports = function (envSessionStore) {
    const sessionStore = getSessionStore(envSessionStore);
    // NOTE: change secure to true for an https site
    const sessionMiddleware = session({
        store: sessionStore,
        secret: 'sessionSecretThatYouWillHaveToGuess',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    });
    return function sessionMiddlewareInitWithRetry(req, res, next) {
        let tries = 3;
        function lookupSession(error) {
            if (error) {
                return next(error);
            }
            tries -= 1;
            if (req.session !== undefined) {
                return next()
            }
            if (tries < 0) {
                return next(new Error('Oh no! Unable to initialize your session store'))
            }
            sessionMiddleware(req, res, lookupSession)
        }
        lookupSession();
    };
};

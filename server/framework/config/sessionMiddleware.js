const session = require('express-session');
const MemoryStore = session.MemoryStore;
const RedisStore = require('connect-redis')(session);

const MEMORY_STORE = 'memory';
const REDIS_STORE = 'redis';

const SESSION_DURATION_SECONDS = 60 * 15;
const SESSION_DURATION_MILLISECONDS = SESSION_DURATION_SECONDS * 1000;

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
                host: REDIS_NETWORK_URL, port: 6379, ttl: SESSION_DURATION_SECONDS
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
        name: 'connect.sid',
        store: sessionStore,
        secret: 'sessionSecretThatYouWillHaveToGuess',
        resave: false,
        saveUninitialized: true,
        rolling: false,
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
                // simple cookie set so client can determine time until auto-logout
                res.cookie('sid.active', (Date.now()+SESSION_DURATION_MILLISECONDS), {
                    httpOnly: false,
                    maxAge: !!req.session.passport? SESSION_DURATION_MILLISECONDS : null
                });
                return next();
            }
            if (tries < 0) {
                return next(new Error('Oh no! Unable to initialize your session store'))
            }
            sessionMiddleware(req, res, lookupSession)
        }
        lookupSession();
    };
};

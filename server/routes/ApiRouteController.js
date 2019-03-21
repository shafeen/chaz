const bottle = require('bottlejs')('basicmean');
bottle.service('ApiRouteController', __,
    'settings', 'express', 'PublicRouteController', 'ProtectedRouteController', 'authVerifyMiddleware'
);
function __(settings, express, PublicRouteController, ProtectedRouteController, authVerifyMiddleware) {
    const router = express.Router();

    // public /api routes entry point
    router.use('/public', PublicRouteController);

    // protected /api routes entry point
    router.use('/protected', authVerifyMiddleware, ProtectedRouteController);

    return router;
}
module.exports = __;

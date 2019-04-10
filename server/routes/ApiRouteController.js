module.exports = {
    name: 'ApiRouteController', service: __,
    dependencies: ['settings', 'express', 'PublicRouteController', 'ProtectedRouteController', 'authVerifyMiddleware']
};

function __(settings, express, PublicRouteController, ProtectedRouteController, authVerifyMiddleware) {
    const router = express.Router();

    // public /api routes entry point
    router.use('/public', PublicRouteController);

    // protected /api routes entry point
    router.use('/protected', authVerifyMiddleware, ProtectedRouteController);

    return router;
}

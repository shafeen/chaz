module.exports = {
    name: 'PartialsRouteController', service: __,
    dependencies: ['settings', 'express', 'authVerifyMiddleware']
};

function __(settings, express, authVerifyMiddleware) {
    const router = express.Router();
    const NG_CLIENT_RELATIVE_PATH = '../../client/ng-client/'; // TODO: use the DI container for this
    const NG_CLIENT_SECURE_RELATIVE_PATH = '../../client/ng-client-secure/';

    // loading module partial views -- anything more specific should come before
    router.get('/:modulename/:partialname', function(req, res) {
        res.render(NG_CLIENT_RELATIVE_PATH + req.params.modulename + '/' + req.params.partialname, {user: req.user, settings: settings});
    });

    // loading secure module partial views -- anything more specific should come before
    router.get('/secure/:modulename/:partialname', authVerifyMiddleware, function(req, res) {
        res.render(NG_CLIENT_SECURE_RELATIVE_PATH + req.params.modulename + '/' + req.params.partialname, {user: req.user, settings: settings});
    });

    return router;
}

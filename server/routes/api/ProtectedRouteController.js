const bottle = require('bottlejs')('basicmean');
bottle.service('ProtectedRouteController', __, 'settings', 'express', 'UserRouteController');
// protected /api routes
// ---------------------
function __(settings, express, UserRouteController) {
    const router = express.Router();

    router.get('/test', (req, res) => {
        res.json({
            message: 'responded via test protected api endpoint'
        })
    });

    router.use('/user', UserRouteController);

    return router;
}
module.exports = __;

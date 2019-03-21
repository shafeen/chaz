const bottle = new require('bottlejs')('basicmean');
bottle.service('PublicRouteController', __, 'settings', 'express');
// public /api routes
// ------------------
function __(settings, express) {
    const router = express.Router();

    router.get('/test', (req, res) => {
        res.json({
            message: 'responded via test public api endpoint'
        })
    });

    return router;
}
module.exports = __;

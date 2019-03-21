const bottle = require('bottlejs')('basicmean');
bottle.service('UserRouteController', __, 'settings', 'express');
function __(settings, express) {
    const router = express.Router();

    router.get('/info', (req, res) => {
        res.json({
            userEmail: req.user.local.email
        });
    });

    return router;
}
module.exports = __;

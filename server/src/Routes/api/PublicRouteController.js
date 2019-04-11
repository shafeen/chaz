module.exports = {
    name: 'PublicRouteController', service: __, dependencies: ['settings', 'express']
};

// public /api Routes
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

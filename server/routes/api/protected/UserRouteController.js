module.exports = {
    name: 'UserRouteController', service: __, dependencies: ['settings', 'express']
};

function __(settings, express) {
    const router = express.Router();

    router.get('/info', (req, res) => {
        res.json({
            userEmail: req.user.local.email
        });
    });

    return router;
}

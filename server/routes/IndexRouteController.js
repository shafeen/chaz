const bottle = require('bottlejs')('basicmean');
bottle.service('IndexRouteController', __,
    'express', 'ApiRouteController', 'AuthenticateRouteController', 'PartialsRouteController'
);
function __(express, ApiRouteController, AuthenticateRouteController, PartialsRouteController) {
    const router = express.Router();
    const AUTHENTICATE_BASE_URL = '/authenticate';

    router.get('/', function (req, res) {
        if (req.isAuthenticated()) {
            res.render('index', {
                user: req.user,
                logoutUrl: AUTHENTICATE_BASE_URL + '/logout'
            });
        } else {
            res.render('index');
        }
    });

    router.use('/partials', PartialsRouteController);

    router.use(AUTHENTICATE_BASE_URL, AuthenticateRouteController);

    router.get('/signup', function (req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/#/profile');
        } else {
            res.render('signup', {
                title: 'Create an account',
                signupUrl: AUTHENTICATE_BASE_URL + '/signup',
                signupMsg: req.flash('signupMsg')
            });
        }
    });

    router.get('/login', function (req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/#/profile');
        } else {
            res.render('login', {
                title: 'Log in',
                loginUrl: AUTHENTICATE_BASE_URL + '/login',
                loginMsg: req.flash('loginMsg')
            });
        }
    });

    router.use('/api', ApiRouteController);

    router.use(/.*/, (req, res) => {
        // Redirect to the home page if no routes match
        res.redirect('/');
    });

    return router;
}
module.exports = __;

module.exports = {
    name: 'IndexRouteController', service: __,
    dependencies: ['require(express)', 'ApiRouteController', 'AuthenticateRouteController', 'PartialsRouteController', 'Metrics']
};

function __(express, ApiRouteController, AuthenticateRouteController, PartialsRouteController, Metrics) {
    const router = express.Router();
    const AUTHENTICATE_BASE_URL = '/authenticate';

    router.use((req, res, next) => {
        Metrics.throughputCounter.inc();
        let startTimeMs = new Date().getTime();
        res.on('finish', () => {
            let endTimeMs = new Date().getTime();
            Metrics.latencyGauge.set({ path : req.originalUrl, statusCode: res.statusCode }, endTimeMs - startTimeMs);
        });
        next();
    });

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
        // Redirect to the home page if no Routes match
        res.redirect('/');
    });

    return router;
}

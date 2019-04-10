const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const sessionMiddleware = require('./config/sessionMiddleware');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');

// configure DI container
const bottle = require('./config/diContainer.js').initialize();

// connect to the database -- NOTE: uncomment when you're ready to add in persistence
const databaseConfig = require('./config/database.js');
databaseConfig(mongoose);

// configure passportjs for login and signup
const passportConfig = require('./config/passport.js');
passportConfig(passport);

const app = express();
const metricsApp = express();

// set up metrics endpoint in the metricsApp
metricsApp.use('/metrics', (req, res) => {
    const { Prometheus } = bottle.container;
    res.send(Prometheus.register.metrics());
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function denyTemplateFiles(req, res, next) {
    if (req.originalUrl.endsWith('.pug') ) {
        res.status(403).send('Restricted resource!');
    } else {
        next();
    }
});
app.use(express.static(path.join(__dirname, '..', 'client', 'ng-client')));
app.use(express.static(path.join(__dirname, '..', 'client', 'ng-client-secure')));
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
app.use('/settings', express.static(path.join(__dirname, 'config', 'settings')));

// setup app to use passportjs
app.use(sessionMiddleware(process.env.SESSION_STORE));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// graphql server setup (must be AFTER passport init)
const graphqlServer = require('./config/graphqlServer');
graphqlServer.applyMiddleware({app});

// entry point for application routes
const { IndexRouteController } = bottle.container;
app.use('/', IndexRouteController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = { app: app, metricsApp: metricsApp };

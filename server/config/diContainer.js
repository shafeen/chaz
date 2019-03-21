const bottle = new require('bottlejs')('basicmean');
const settings = require('./settings/settings.json');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

module.exports.initialize = function () {
    // initialize constants and system services
    bottle.constant('ASSETS_FOLDER', path.join(__dirname, '../../../assets'));
    bottle.service('settings', function() { return settings; });
    bottle.service('require', function() { return require; });
    bottle.service('path', function() { return path; });
    bottle.service('express', function() { return express; });
    bottle.service('mongoose', function() { return mongoose; });
    bottle.service('bcrypt', function() { return bcrypt; });
    bottle.service('passport', function() { return passport; });

    // initialize app utility services, middleware, etc
    const SERVER_FOLDER = '../../server/';
    const utilitiesToRequire = [
        `${SERVER_FOLDER}/library/Utilities/authVerifyMiddleware.js`,
        `${SERVER_FOLDER}/library/Utilities/cacheSetMiddleware.js`,
        `${SERVER_FOLDER}/library/Utilities/requireUncached.js`
    ];
    utilitiesToRequire.forEach(
        requirePath => require(path.join(__dirname, requirePath))
    );

    // initialize app services, controllers and other components
    const componentsToRequire = [
        `${SERVER_FOLDER}/models/UserModel.js`,
        `${SERVER_FOLDER}/library/Repositories/UserRepository.js`,
        `${SERVER_FOLDER}/routes/PartialsRouteController.js`,
        `${SERVER_FOLDER}/routes/IndexRouteController.js`,
        `${SERVER_FOLDER}/routes/ApiRouteController.js`,
        `${SERVER_FOLDER}/routes/AuthenticateRouteController.js`,
        `${SERVER_FOLDER}/routes/api/PublicRouteController.js`,
        `${SERVER_FOLDER}/routes/api/ProtectedRouteController.js`,
        `${SERVER_FOLDER}/routes/api/protected/UserRouteController.js`
    ];
    componentsToRequire.forEach(
        requirePath => require(path.join(__dirname, requirePath))
    );

    return bottle;
};

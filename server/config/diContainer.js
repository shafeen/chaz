const bottle = new require('bottlejs')('basicmean');
const settings = require('./settings/settings.json');
const fs = require('fs');
const path = require('path');
const debug = require('debug');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const moment = require('moment');

let OrderedApplicationRunnersInBottle = null;

module.exports.initialize = function () {
    // initialize constants and system services
    bottle.constant('APPLICATION_NAME', 'chaz');
    bottle.constant('ASSETS_FOLDER', path.join(__dirname, '../../../assets'));
    bottle.service('require', function() { return require; });
    bottle.service('settings', function() { return settings; });
    bottle.service('path', function() { return path; });
    bottle.service('debug', function() { return debug; });
    bottle.service('express', function() { return express; });
    bottle.service('mongoose', function() { return mongoose; });
    bottle.service('bcrypt', function() { return bcrypt; });
    bottle.service('passport', function() { return passport; });
    bottle.service('moment', function() { return moment; });

    // ----------------------
    // AutoScan to BottleJS:
    // ----------------------
    // initialize app services, controllers and other components
    // initialize app utility services, middleware, etc

    // update this list when you want to add more folders to scan
    const FOLDERS_TO_RECURSIVELY_SCAN = [
        '../src'
    ];

    const bottleRegisterFilesInDirectory = function (absoluteDirectoryPath) {
        const allDirectoryItemsWithAbsolutePath = fs.readdirSync(absoluteDirectoryPath)
            .map(name => `${absoluteDirectoryPath}/${name}`);
        const jsBottleTargets= allDirectoryItemsWithAbsolutePath.filter(absoluteItemPath =>
            absoluteItemPath.endsWith('.js') &&
            !fs.lstatSync(absoluteItemPath, {withFileTypes: true}).isDirectory() &&
            isBottleTarget(absoluteItemPath)
        );
        jsBottleTargets.forEach(registerToBottle);

        const directoriesWithAbsolutePath = allDirectoryItemsWithAbsolutePath.filter(absoluteItemPath =>
            fs.lstatSync(absoluteItemPath, {withFileTypes: true}).isDirectory()
        );
        directoriesWithAbsolutePath.forEach(bottleRegisterFilesInDirectory);
    };

    const isBottleTarget = function (absolutePathForFile) {
        const potentialTargetModule = require(absolutePathForFile);
        const properties = new Set(Object.keys(potentialTargetModule));
        const NAME='name', SERVICE='service', DEPENDENCIES='dependencies';
        const required = [ NAME, SERVICE, DEPENDENCIES ];
        if (required.every(requiredProperty => properties.has(requiredProperty)) &&
            typeof potentialTargetModule[NAME] === 'string' &&
            typeof potentialTargetModule[SERVICE] === 'function' &&
            Array.isArray(potentialTargetModule[DEPENDENCIES]) &&
            potentialTargetModule[DEPENDENCIES].length === potentialTargetModule[SERVICE].length
        ) {
            return true;
        }
    };

    const registerToBottle = function (absolutePathForFile) {
        const moduleToRegister = require(absolutePathForFile);
        bottle.service(
            moduleToRegister.name,
            moduleToRegister.service,
            ...moduleToRegister.dependencies
        );
    };

    const setupInjectables = function () {
        FOLDERS_TO_RECURSIVELY_SCAN.forEach(folderRelativePath => {
            bottleRegisterFilesInDirectory(path.join(__dirname, folderRelativePath));
        });
    };

    const findSortApplicationRunners = function () {
        const APP_RUNNNER_DIR = './ApplicationRunner';
        bottleRegisterFilesInDirectory(path.join(__dirname, APP_RUNNNER_DIR));

        const { ApplicationRunner } = bottle.container;
        OrderedApplicationRunnersInBottle = Object.keys(bottle.container)
            .map(injectableName => bottle.container[injectableName])
            .filter(injectable =>
                typeof injectable === 'function' &&
                ApplicationRunner.isPrototypeOf(injectable)
            )
            .map(ApplicationRunnerSubClass => new ApplicationRunnerSubClass())
            .sort((subclass1, subclass2) =>
                subclass1.order() < subclass2.order()? -1: 1
            );
    };

    setupInjectables();
    findSortApplicationRunners();

    return bottle;
};

// This should be called separately in app.js after all injectables initialized
module.exports.setupApplicationRunners = function () {
    if (OrderedApplicationRunnersInBottle && Array.isArray(OrderedApplicationRunnersInBottle)) {
        OrderedApplicationRunnersInBottle.forEach(runner => runner.run());
    }
};

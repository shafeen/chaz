const bottle = new require('bottlejs')('chaz'); // TODO: make the application name a constant
const fs = require('fs');
const path = require('path');

let OrderedApplicationRunnersInBottle = [];
let modulesToRequire = new Set();
let resourcesToRequire = new Set();
const componentList = [];
let requireModulesRegistrationComplete = false;

// update this list when you want to add more folders to scan
const SRC_FOLDERS_TO_RECURSIVELY_SCAN = [ '../../src' ];
const FRAMEWORK_INJECTABLES_FOLDER = './FrameworkInjectables';
const RESOURCES_FOLDER_TO_RECURSIVELY_SCAN = '../../resources';

module.exports.initialize = function () {
    // initialize constants and system services
    bottle.constant('APPLICATION_NAME', 'chaz');
    bottle.constant('ASSETS_FOLDER', path.join(__dirname, '../../../assets'));
    bottle.service('require', function() { return require; });

    // --------------------------------
    // AutoScan Components to BottleJS:
    // --------------------------------
    // detect and initialize "require" modules first, then
    // initialize app services, controllers and other components
    // initialize app utility services, middleware, etc

    const bottleRegisterFilesInDirectory = function (absoluteDirectoryPath) {
        updateComponentListInDirectory(absoluteDirectoryPath);
        registerRequireModulesToBottle();
        registerResourcesToBottle();
        registerComponentsToBottle();
    };

    const updateComponentListInDirectory = function (absoluteDirectoryPath) {
        const allDirectoryItemsWithAbsolutePath = fs.readdirSync(absoluteDirectoryPath)
            .map(name => `${absoluteDirectoryPath}/${name}`);
        const jsBottleTargets= allDirectoryItemsWithAbsolutePath.filter(absoluteItemPath =>
            absoluteItemPath.endsWith('.js') &&
            !fs.lstatSync(absoluteItemPath, {withFileTypes: true}).isDirectory() &&
            isBottleTarget(absoluteItemPath)
        );
        jsBottleTargets.forEach(updateComponentList);

        const directoriesWithAbsolutePath = allDirectoryItemsWithAbsolutePath.filter(absoluteItemPath =>
            fs.lstatSync(absoluteItemPath, {withFileTypes: true}).isDirectory()
        );
        directoriesWithAbsolutePath.forEach(updateComponentListInDirectory);
    };

    const isBottleTarget = function (absolutePathForFile) {
        const potentialTargetModule = require(absolutePathForFile);
        const properties = new Set(Object.keys(potentialTargetModule));
        const NAME='name', SERVICE='service', DEPENDENCIES='dependencies';
        const required = [ NAME, SERVICE, DEPENDENCIES ];
        const isComponentForDIContainer = required.every(
            requiredProperty => properties.has(requiredProperty)
        );
        if (isComponentForDIContainer) {
            // Run Validation checks for declared Components
            if (typeof potentialTargetModule[NAME] !== 'string') {
                throw new Error(`"${absolutePathForFile}": Component "${NAME}" attribute must be a string!`);
            }
            if (potentialTargetModule[NAME].length === 0) {
                throw new Error(`"${absolutePathForFile}": Component "${NAME}" attribute cannot be an empty string!`);
            }
            if (typeof potentialTargetModule[SERVICE] !== 'function') {
                throw new Error(`"${absolutePathForFile}": Component "${SERVICE}" attribute must be a function!`);
            }
            if (Array.isArray(potentialTargetModule[DEPENDENCIES]) === false) {
                throw new Error(`"${absolutePathForFile}": Component "${DEPENDENCIES}" attribute must be an array!`);
            }
            if (potentialTargetModule[DEPENDENCIES].length !== potentialTargetModule[SERVICE].length) {
                throw new Error(
                    `"${absolutePathForFile}": Component "${DEPENDENCIES}" list doesn't match "${SERVICE}" function parameter count! ` +
                    `Function "${SERVICE}" expecting ${potentialTargetModule[SERVICE].length} parameters, getting ${potentialTargetModule[DEPENDENCIES].length} from "${DEPENDENCIES}".`
                );
            }
            return true;
        } else {
            // TODO: emit a warning here later
        }
    };

    const updateComponentList = function (absolutePathForFile) {
        const moduleToRegister = require(absolutePathForFile);
        updateDependencyModulesToRequire(moduleToRegister.dependencies);
        updateResourceFilesToRequire(moduleToRegister.dependencies, absolutePathForFile);
        componentList.push(absolutePathForFile);
    };

    const updateDependencyModulesToRequire = function (dependencyStrList) {
        const modulesToRequireRegex = /^require\(\s*(.*)\s*\)$/;
        const dependencyModulesToRequire = dependencyStrList
            .map(dependencyStr => dependencyStr.trim())
            .filter(
                dependencyStr => modulesToRequireRegex.test(dependencyStr)
            )
            .map(dependencyStr => modulesToRequireRegex.exec(dependencyStr)[1]);
        dependencyModulesToRequire.forEach(moduleName => modulesToRequire.add(moduleName));
    };

    const updateResourceFilesToRequire = function (dependencyStrList, pathForRequestorComponent) {
        const resourcesToRequireRegex = /^resource\(\s*(.*)\s*\)$/;
        const resourceStrsToRequire = dependencyStrList
            .map(dependencyStr => dependencyStr.trim())
            .filter(
                dependencyStr => resourcesToRequireRegex.test(dependencyStr)
            )
            .map(dependencyStr => resourcesToRequireRegex.exec(dependencyStr)[1]);
        resourceStrsToRequire.forEach(resourceRelativePath => {
            const resourceAbsolutePath = path.join(
                __dirname,
                RESOURCES_FOLDER_TO_RECURSIVELY_SCAN,
                resourceRelativePath
            );
            if (!fs.existsSync(resourceAbsolutePath)) {
                throw new Error(
                    `'${pathForRequestorComponent}': Can't find file '${resourceRelativePath}' `+
                    `in the ${path.join(__dirname, RESOURCES_FOLDER_TO_RECURSIVELY_SCAN)} directory`
                );
            }
            resourcesToRequire.add(resourceRelativePath);
        });
    };

    const registerRequireModulesToBottle = function () {
        const modulesToRequireList = Array.from(modulesToRequire);
        modulesToRequireList.forEach(moduleToRequire => {
            bottle.service(
                `require(${moduleToRequire})`,
                function () {
                    return require(moduleToRequire)
                },
                ...[]
            );
        });
        requireModulesRegistrationComplete = true;
    };

    const registerResourcesToBottle = function () {
        const resourcesToRequireList = Array.from(resourcesToRequire);
        resourcesToRequireList.forEach(resourceToRequire => {
            bottle.service(
                `resource(${resourceToRequire})`,
                function () {
                    return require(`${RESOURCES_FOLDER_TO_RECURSIVELY_SCAN}/${resourceToRequire}`)
                },
                ...[]
            );
        });
        requireModulesRegistrationComplete = true;
    };

    const registerComponentsToBottle = function () {
        if (!requireModulesRegistrationComplete) {
            throw new Error(
                "REQUIRED: 'require' module registration must complete before component registration!"
            );
        }
        componentList.forEach(absolutePathForFile => {
            const moduleToRegister = require(absolutePathForFile);
            bottle.service(
                moduleToRegister.name,
                moduleToRegister.service,
                ...moduleToRegister.dependencies
            );
        });
    };

    const setupInjectables = function () {
        SRC_FOLDERS_TO_RECURSIVELY_SCAN.concat(FRAMEWORK_INJECTABLES_FOLDER)
            .forEach(folderRelativePath => {
                bottleRegisterFilesInDirectory(path.join(__dirname, folderRelativePath));
            }
        );
    };

    const findSortApplicationRunners = function () {
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

function onWin32Platform() {
    return process.platform === 'win32';
}
function getRootProjectDir() {
    // detect root directory and expected folder structure
    const path = require('path');
    const fs = require('fs');
    const rootDirPath = onWin32Platform()?
        path.win32.dirname(require.main.filename) : path.posix.dirname(require.main.filename);
    const srcDirPath = fs.existsSync(`${rootDirPath}/src`) ? `${rootDirPath}/src` : null;
    const resourcesDirPath = fs.existsSync(`${rootDirPath}/resources`) ? `${rootDirPath}/resources` : null;
    if (srcDirPath === null || resourcesDirPath === null) {
        console.error(`"${rootDirPath}": Could not locate both src/ and resources/ directories. Exiting!`);
        process.exit(1);
    }
    return rootDirPath;
}
function configureDIContainer(rootDirAbsolutePath) {
    const diContainer = require('./framework/config/diContainer.js');
    diContainer.initialize(rootDirAbsolutePath);
    // initialize ApplicationRunners / TaskSchedulers after all injectables ready
    diContainer.setupApplicationRunners();
    return diContainer.setupTaskSchedulers();
}
module.exports.initialize = function ({ rootProjectAbsolutePath } = {}) {
    rootProjectAbsolutePath = rootProjectAbsolutePath || getRootProjectDir();
    return configureDIContainer(rootProjectAbsolutePath);
};

function getRootProjectDir() {
    // detect root directory and expected folder structure
    const path = require('path');
    const fs = require('fs');
    const rootDirPath = path.posix.dirname(require.main.filename);
    const srcDirPath = fs.existsSync(`${rootDirPath}/src`) ? `${rootDirPath}/src` : null;
    const resourcesDirPath = fs.existsSync(`${rootDirPath}/resources`) ? `${rootDirPath}/resources` : null;
    if (srcDirPath === null || resourcesDirPath === null) {
        console.error(`"${rootDirPath}": Could not locate both src/ and resource/ directories. Exiting!`);
        process.exit(1);
    }
    return path.posix.dirname(require.main.filename);
}
function configureDIContainer(rootDirAbsolutePath) {
    const diContainer = require('./framework/config/diContainer.js');
    diContainer.initialize(rootDirAbsolutePath);
    // initialize ApplicationRunners after all injectables ready
    diContainer.setupApplicationRunners();
}
module.exports.initialize = function () {
    configureDIContainer(getRootProjectDir());
};

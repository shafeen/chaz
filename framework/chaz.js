// configure DI container
const diContainer = require('./config/diContainer.js');
diContainer.initialize();
// initialize ApplicationRunners after all injectables ready
diContainer.setupApplicationRunners();
module.exports = {};

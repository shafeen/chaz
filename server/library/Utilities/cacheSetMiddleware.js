const bottle = require('bottlejs')('basicmean');
bottle.service('cacheSetMiddleware', __);
function __() {
    const cacheSetMiddleware = (req, res, next) => {
        let oneHour = 3600;
        res.header('Cache-Control', `public, max-age=${oneHour}`);
        next();
    };
    return cacheSetMiddleware;
}
module.exports = __;

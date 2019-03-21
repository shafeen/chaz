const bottle = require('bottlejs')('basicmean');
bottle.service('requireUncached', __, 'path', 'require');
function __(path, require) {
    /**
     * @param {string} requirePath
     * @return {*}
     */
    const requireUncached = function (requirePath) {
        const absoluteRequirePath = path.join(__dirname, requirePath);
        delete require.cache[absoluteRequirePath];
        return require(requirePath);
    };
    return requireUncached;
}
module.exports = __;

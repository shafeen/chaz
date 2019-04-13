module.exports = {
    name: 'requireUncached', service: __, dependencies: ['require(path)', 'require']
};

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

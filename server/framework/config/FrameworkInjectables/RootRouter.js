module.exports = {
    name: 'RootRouter', service: __, dependencies: ['require(express)']
};

function __(express) {
    return express.Router();
}

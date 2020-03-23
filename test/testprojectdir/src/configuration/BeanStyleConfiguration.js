module.exports = {
    name: 'BeanStyleConfiguration',
    config: {
        bean1: {
            dependencies: [],
            service: function () {
                return { msg: "bean1 message" };
            }
        },
        bean2: {
            dependencies: [],
            service: function () {
                return { msg: "bean2 message" };
            }
        }
    },
};

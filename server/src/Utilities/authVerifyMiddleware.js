module.exports = {
    name: 'authVerifyMiddleware', service: __, dependencies: []
};

function __() {
    const authVerifyMiddleware = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(403).json({
                message: 'Unauthorized request (no user logged in)!'
            });
        }
    };
    return authVerifyMiddleware;
}

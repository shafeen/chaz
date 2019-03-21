const assert = require('chai').assert;
const sinon = require('sinon');

describe('IndexRouteController', function () {
    const expressMock = {Router: sinon.stub()};
    const routeToMiddlewareMap = new Map();
    const routeToMiddlewareCaptor = function (route, effectiveMiddleware) {
        route = (typeof route === 'object')? route.toString() : route;
        routeToMiddlewareMap.set(route, effectiveMiddleware);
    };
    const routerMock = {
        use: routeToMiddlewareCaptor,
        get: routeToMiddlewareCaptor,
    };
    sinon.spy(routerMock, 'use');
    sinon.spy(routerMock, 'get');
    expressMock.Router.returns(routerMock);
    const ApiRouteControllerMock = sinon.stub();
    const AuthenticateRouteControllerMock = sinon.stub();
    const PartialsRouteControllerMock = sinon.stub();

    before(function () {
        const IndexRouteController = require('../../../server/routes/IndexRouteController.js')(
            expressMock, ApiRouteControllerMock, AuthenticateRouteControllerMock, PartialsRouteControllerMock
        );
    });

    it('should register a GET / (root) route where authentication is verified', function () {
        assert.isTrue(routerMock.get.calledWith('/'));

        const reqMock = {isAuthenticated: sinon.stub()};
        const resMock = {redirect: sinon.stub(), render: sinon.stub()};
        const rootRouteHandler = routeToMiddlewareMap.get('/');

        reqMock.isAuthenticated.returns(true);
        rootRouteHandler(reqMock, resMock);
        assert.isTrue(resMock.render.calledOnce);
        assert.isTrue(resMock.render.calledWith('index'));
        const calledWith2Args = (resMock.render.args[0].length === 2);
        assert.isTrue(calledWith2Args);

        reqMock.isAuthenticated.returns(false);
        rootRouteHandler(reqMock, resMock);
        assert.isTrue(resMock.render.calledTwice);
        assert.isTrue(resMock.render.calledWith('index'));
        const calledWith1Arg = (resMock.render.args[1].length === 1);
        assert.isTrue(calledWith1Arg);
    });


    it('should register a /partials subroute handled by PartialsRouteController', function () {
        assert.isTrue(routerMock.use.calledWith('/partials', PartialsRouteControllerMock));
    });

    it('should register an /authenticate subroute handled by the AuthenticateRouteController', function () {
        assert.isTrue(routerMock.use.calledWith('/authenticate', AuthenticateRouteControllerMock));
    });

    it('should register an /api subroute handled by the ApiRouteController', function () {
        assert.isTrue(routerMock.use.calledWith('/api', ApiRouteControllerMock));
    });

    it('should register a catch-all fallback route that redirects to root (GET /)', function () {
        assert.isTrue(routerMock.use.calledWith(/.*/));
        const fallbackRouteHandler = routeToMiddlewareMap.get('/.*/');
        const reqMock = {}, resMock = {redirect: sinon.stub()};
        fallbackRouteHandler(reqMock, resMock);
        assert.isTrue(resMock.redirect.calledWith('/'));
    });

    it('should register a GET /signup route which authenticates and renders/redirects appropriately', function () {
        assert.isTrue(routerMock.get.calledWith('/signup'));
        const signupRouteHandler = routeToMiddlewareMap.get('/signup');

        const reqMock = {isAuthenticated: sinon.stub(), flash: sinon.stub()},
            resMock = {redirect: sinon.stub(), render: sinon.stub()};
        reqMock.isAuthenticated.returns(true);
        signupRouteHandler(reqMock, resMock);
        assert.isTrue(reqMock.isAuthenticated.calledOnce);
        assert.isTrue(resMock.redirect.calledOnce);
        assert.isTrue(resMock.redirect.calledWith('/#/profile'));
        assert.equal(resMock.render.callCount, 0);

        reqMock.isAuthenticated.resetHistory();
        reqMock.isAuthenticated.returns(false);
        signupRouteHandler(reqMock, resMock);
        assert.isTrue(reqMock.isAuthenticated.calledOnce);
        assert.isTrue(resMock.render.calledOnce);
        assert.isTrue(resMock.render.calledWith('signup'));
    });


    it('should register a GET /login route which authenticates and renders/redirects appropriately', function () {
        assert.isTrue(routerMock.get.calledWith('/login'));
        const loginRouteHandler = routeToMiddlewareMap.get('/login');

        const reqMock = {isAuthenticated: sinon.stub(), flash: sinon.stub()},
            resMock = {redirect: sinon.stub(), render: sinon.stub()};
        reqMock.isAuthenticated.returns(true);
        loginRouteHandler(reqMock, resMock);
        assert.isTrue(reqMock.isAuthenticated.calledOnce);
        assert.isTrue(resMock.redirect.calledOnce);
        assert.isTrue(resMock.redirect.calledWith('/#/profile'));
        assert.equal(resMock.render.callCount, 0);

        reqMock.isAuthenticated.resetHistory();
        reqMock.isAuthenticated.returns(false);
        loginRouteHandler(reqMock, resMock);
        assert.isTrue(reqMock.isAuthenticated.calledOnce);
        assert.isTrue(resMock.render.calledOnce);
        assert.isTrue(resMock.render.calledWith('login'));
    });
});

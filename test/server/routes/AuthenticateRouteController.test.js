const assert = require('chai').assert;
const sinon = require('sinon');

describe('AuthenticateRouteController', function () {

    const passportStrategyHandlerMap = new Map();
    const passportMock = {
        authenticate: function(strategy, handler) {
            passportStrategyHandlerMap.set(strategy, handler);
            return function(){};
        }
    };
    sinon.spy(passportMock, 'authenticate');
    const expressMock = {Router: sinon.stub()};
    const routeToMiddlewareMap = new Map();
    const routerMock = {
        get: function (route, effectiveMiddleware) {
            routeToMiddlewareMap.set(route, effectiveMiddleware);
        },
        post: function (route, effectiveMiddleware) {
            routeToMiddlewareMap.set(route, effectiveMiddleware);
        },
    };
    sinon.spy(routerMock, 'get');
    sinon.spy(routerMock, 'post');
    expressMock.Router.returns(routerMock);

    before(function () {
        const AuthenticateRouteController = require('../../../server/routes/AuthenticateRouteController.js')(
            passportMock, expressMock
        );
        // TODO: improve code testing coverage here
    });

    it('should register a GET /logout route handler', function () {
        const routeName = '/logout';
        assert.isTrue(routerMock.get.calledWith(routeName));

        const reqMock = {logout: sinon.stub()}, resMock = {redirect: sinon.stub()}, nextMock = {};
        routeToMiddlewareMap.get(routeName)(reqMock, resMock, nextMock);
        assert.isTrue((reqMock.logout.calledOnce));
        assert.isTrue((resMock.redirect.calledOnce));
    });

    it('should register a POST /signup route handler that uses passport', function () {
        const routeName = '/signup';
        assert.isTrue(routerMock.post.calledWith(routeName));

        const reqMock = {logIn: sinon.stub()},
            resMock = {status: sinon.stub(), json: sinon.stub()},
            nextMock = sinon.stub();
        resMock.status.returns(resMock);

        const authenticateCallCountBefore = passportMock.authenticate.callCount;
        routeToMiddlewareMap.get(routeName)(reqMock, resMock, nextMock);
        assert.equal(passportMock.authenticate.callCount, authenticateCallCountBefore+1);
        assert.isTrue(passportMock.authenticate.calledWith('local-signup'));

        const passportStrategyHandler = passportStrategyHandlerMap.get('local-signup');
        let errorMock = false, userMock = true;
        passportStrategyHandler(errorMock, userMock, null);
        assert.isTrue(reqMock.logIn.calledOnce);
        assert.isTrue(reqMock.logIn.calledWith(userMock));

        errorMock = true;
        assert.equal(nextMock.callCount, 0);
        passportStrategyHandler(errorMock, userMock, null);
        assert.isTrue(nextMock.calledWith(errorMock));

        errorMock = false;
        userMock = false;
        assert.equal(resMock.status.callCount, 0);
        passportStrategyHandler(errorMock, userMock, null);
        assert.isTrue(resMock.status.calledWith(400));
    });

    it('should register a POST /login route handler that uses passport', function () {
        const routeName = '/login';
        assert.isTrue(routerMock.post.calledWith(routeName));

        const reqMock = {logIn: sinon.stub()},
            resMock = {status: sinon.stub(), json: sinon.stub()},
            nextMock = sinon.stub();
        resMock.status.returns(resMock);

        const authenticateCallCountBefore = passportMock.authenticate.callCount;
        routeToMiddlewareMap.get(routeName)(reqMock, resMock, nextMock);
        assert.equal(passportMock.authenticate.callCount, authenticateCallCountBefore+1);
        assert.isTrue(passportMock.authenticate.calledWith('local-login'));

        const passportStrategyHandler = passportStrategyHandlerMap.get('local-login');
        let errorMock = false, userMock = true;
        passportStrategyHandler(errorMock, userMock, null);
        assert.isTrue(reqMock.logIn.calledOnce);
        assert.isTrue(reqMock.logIn.calledWith(userMock));

        errorMock = true;
        assert.equal(nextMock.callCount, 0);
        passportStrategyHandler(errorMock, userMock, null);
        assert.isTrue(nextMock.calledWith(errorMock));

        errorMock = false;
        userMock = false;
        assert.equal(resMock.status.callCount, 0);
        passportStrategyHandler(errorMock, userMock, null);
        assert.isTrue(resMock.status.calledWith(400));
    });

});
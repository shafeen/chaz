const assert = require('chai').assert;
const sinon = require('sinon');

describe('UserRouteController', function () {
    const settingsMock = {};
    const expressMock = { Router: sinon.stub() };
    const routeToMiddlewareMap = new Map();
    const routerMock = {
        get: function (route, effectiveMiddleware) {
            routeToMiddlewareMap.set(route, effectiveMiddleware);
        },
    };
    const routerGetSpy = sinon.spy(routerMock, 'get');
    expressMock.Router.returns(routerMock);

    before(function () {
        const UserRouteController = require(
            '../../../../../server/routes/api/protected/UserRouteController.js').service(
            settingsMock, expressMock
        );
    });

    it('should register GET /info route', function () {
        routerGetSpy.calledWith('/info');
    });

    it('GET /info route handler should call res.json', function () {
        const reqMock = {user:{local:{email:{}}}};
        const resMock = {json: sinon.stub()};

        const infoRouteHandler = routeToMiddlewareMap.get('/info');
        assert.equal(resMock.json.callCount, 0);
        infoRouteHandler(reqMock, resMock);
        assert.equal(resMock.json.callCount, 1);
    });
});

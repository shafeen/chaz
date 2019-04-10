const assert = require('chai').assert;
const sinon = require('sinon');

describe('PublicRouteController', function () {

    const settingsMock = {};
    const MetagameRouteControllerMock = sinon.stub();
    const CardsRouteControllerMock = sinon.stub();
    const expressMock = { Router: sinon.stub() };

    it('should set a simple GET /test route handler', function () {
        const routeName = '/test';
        const routeToMiddlewareMap = new Map();
        const routerMock = {
            get: function (route, effectiveMiddleware) {
                routeToMiddlewareMap.set(route, effectiveMiddleware);
            },
            use: sinon.stub()
        };
        const routerGetSpy = sinon.spy(routerMock, 'get');
        expressMock.Router.returns(routerMock);
        const PublicRouteController = require('../../../../server/routes/api/PublicRouteController.js').service(
            settingsMock, expressMock
        );
        assert.equal(PublicRouteController, routerMock);
        assert.isTrue(routerMock.get.calledOnce);
        assert.isTrue(routerMock.get.calledWith(routeName));
        const routeMiddleware = routeToMiddlewareMap.get(routeName);
        const reqMock = {}, resMock = {json: sinon.stub()};
        routeMiddleware(reqMock, resMock);
        assert.isTrue(resMock.json.calledOnce);
    });

});

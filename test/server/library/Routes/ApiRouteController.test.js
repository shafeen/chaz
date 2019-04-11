const assert = require('chai').assert;
const sinon = require('sinon');

describe('ApiRouteController', function () {
    const settingsMock = {};
    const expressMock = { Router: sinon.stub() };
    const routerMock = { use: sinon.stub() };
    expressMock.Router.returns(routerMock);
    const PublicRouteControllerMock = sinon.stub();
    const ProtectedRouteControllerMock = sinon.stub();
    const authVerifyMiddlewareMock = sinon.stub();

    before(function () {
        const ApiRouteController = require('../../../../server/src/Routes/ApiRouteController.js').service(
            settingsMock,
            expressMock,
            PublicRouteControllerMock,
            ProtectedRouteControllerMock,
            authVerifyMiddlewareMock
        );
    });

    it('should set PublicRouteController to handle /public subroutes', function () {
        assert.isTrue(routerMock.use.calledWith('/public', PublicRouteControllerMock));
    });

    it('should set ProtectedRouteController to handle /protected subroutes', function () {
        assert.isTrue(routerMock.use.calledWith(
            '/protected', authVerifyMiddlewareMock, ProtectedRouteControllerMock)
        );
    });
});

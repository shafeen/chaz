const assert = require('chai').assert;
const sinon = require('sinon');

describe('PartialsRouteController', function () {
    const settingsMock = {};
    const expressMock = {Router: sinon.stub()};
    const routeToMiddlewareMap = new Map();
    const routeToMiddlewareCaptor = function () {
        let route = arguments[0], effectiveMiddleware = arguments[arguments.length - 1];
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

    before(function () {
        const PartialsRouteController = require('../../../../server/library/Routes/PartialsRouteController.js').service(
            settingsMock, expressMock
        );
    });

    it('should register a GET /:modulename/:partialname route handler for partials', function () {
        assert.isTrue(routerMock.get.calledWith('/:modulename/:partialname'));
        const partialsRouteHandler = routeToMiddlewareMap.get('/:modulename/:partialname');

        const NG_CLIENT_RELATIVE_PATH = '../../client/ng-client/'; // TODO: use the DI container for this
        const reqMock = {params: {modulename: 'module', partialname: 'partial'}};
        const resMock = {render: sinon.stub()};

        partialsRouteHandler(reqMock, resMock);
        assert.isTrue(resMock.render.calledOnce);
        assert.isTrue(resMock.render.calledWith(
            NG_CLIENT_RELATIVE_PATH +
            reqMock.params.modulename + '/' +
            reqMock.params.partialname
        ));
    });

    it('should register a GET /secure/:modulename/:partialname route handler for partials', function () {
        assert.isTrue(routerMock.get.calledWith('/secure/:modulename/:partialname'));
        const partialsRouteHandler = routeToMiddlewareMap.get('/secure/:modulename/:partialname');

        const NG_CLIENT_SECURE_RELATIVE_PATH = '../../client/ng-client-secure/'; // TODO: use the DI container for this
        const reqMock = {params: {modulename: 'module', partialname: 'partial'}};
        const resMock = {render: sinon.stub()};

        partialsRouteHandler(reqMock, resMock);
        assert.isTrue(resMock.render.calledOnce);
        assert.isTrue(resMock.render.calledWith(
            NG_CLIENT_SECURE_RELATIVE_PATH +
            reqMock.params.modulename + '/' +
            reqMock.params.partialname
        ));
    });
});

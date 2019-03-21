const assert = require('chai').assert;
const sinon = require('sinon');

const authVerifyMiddleware = require('../../../../server/library/Utilities/authVerifyMiddleware.js')();

describe('authVerifyMiddleware', function () {

    it('should call next() if req.isAuthenticated() is true', function () {
        let reqObjMock = { isAuthenticated: sinon.stub() };
        reqObjMock.isAuthenticated.withArgs().returns(true);
        let nextFuncMock = sinon.stub();
        let resObjMock = { status: sinon.stub(), json: sinon.stub() };
        resObjMock.status.returns(resObjMock);
        resObjMock.json.returns(resObjMock);

        authVerifyMiddleware(reqObjMock, resObjMock, nextFuncMock);
        assert.isTrue(reqObjMock.isAuthenticated.calledOnce);
        assert.isTrue(nextFuncMock.calledOnce);
        assert.isTrue(resObjMock.status.notCalled);
        assert.isTrue(resObjMock.json.notCalled);
    });

    it('should set status and trigger a json response if req.isAuthenticated() is false', function () {
        let reqObjMock = { isAuthenticated: sinon.stub() };
        reqObjMock.isAuthenticated.withArgs().returns(false);
        let nextFuncMock = sinon.stub();
        let resObjMock = { status: sinon.stub(), json: sinon.stub() };
        resObjMock.status.returns(resObjMock);
        resObjMock.json.returns(resObjMock);

        authVerifyMiddleware(reqObjMock, resObjMock, nextFuncMock);
        assert.isTrue(reqObjMock.isAuthenticated.calledOnce);
        assert.isTrue(nextFuncMock.notCalled);
        assert.isTrue(resObjMock.status.calledOnce);
        assert.isTrue(resObjMock.status.calledOnceWith(403));
        assert.isTrue(resObjMock.json.calledOnce);
    });
});

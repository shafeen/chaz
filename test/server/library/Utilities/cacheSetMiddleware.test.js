const assert = require('chai').assert;
const sinon = require('sinon');

const cacheSetMiddleware = require('../../../../server/src/Utilities/cacheSetMiddleware.js').service();

describe('cacheSetMiddleware', function () {

    it('should set the response Cache-Control header and pass to next()', function () {
        let reqObjMock = {};
        let nextFuncMock = sinon.stub();
        let resObjMock = { header: sinon.stub() };

        cacheSetMiddleware(reqObjMock, resObjMock, nextFuncMock);
        assert.isTrue(resObjMock.header.calledOnce);
        assert.isTrue(resObjMock.header.calledOnceWith('Cache-Control'));
        assert.isTrue(nextFuncMock.calledOnce);
    });
});

const assert = require('chai').assert;
const sinon = require('sinon');

describe('UserRepository', function () {
    const UserModelSaveMock = sinon.stub();
    let UserModelMockConstructor = sinon.stub();
    UserModelMockConstructor.returns(new function() {
        this.local = { email: ''};
        this.generateHash = sinon.stub();
        this.save = UserModelSaveMock
    });
    let UserModelMock = UserModelMockConstructor;
    sinon.spy(UserModelMockConstructor);
    sinon.spy(UserModelMock);
    UserModelMock.findOne = sinon.stub();
    UserModelMock.findOne.returns({exec: sinon.stub()});
    const UserRepository = require('../../../../server/library/Repositories/UserRepository.js')(
        UserModelMock
    );

    it('#findSingleUser should invoke UserModel.findOne (nonempty options)', function () {
        const optionsMock = {email: 'test@example.com', id: 1};
        const countBeforeCall = UserModelMock.findOne.callCount;
        UserRepository.findSingleUser(optionsMock);
        assert.equal(UserModelMock.findOne.callCount, countBeforeCall+1);
    });

    it('#findSingleUser should invoke UserModel.findOne (empty options)', function () {
        const optionsMock = {};
        const countBeforeCall = UserModelMock.findOne.callCount;
        UserRepository.findSingleUser(optionsMock);
        assert.equal(UserModelMock.findOne.callCount, countBeforeCall+1);
    });

    it('#createNewUser should invoke UserModel.save on a UserModel instance', function () {
        const optionsMock = {email: 'test@example.com', password: 'testpassword'};
        assert.equal(UserModelMock.calledWithNew(), false);
        assert.equal(UserModelSaveMock.callCount, 0);
        UserRepository.createNewUser(optionsMock);
        assert.equal(UserModelMock.calledWithNew(), true);
        assert.equal(UserModelSaveMock.callCount, 1);
    });


});

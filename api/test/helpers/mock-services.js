const sinon = require('sinon');
const uuid = require('uuid');
const ses = require('../../src/lib/ses');

module.exports = {
  mockSes() {
    const mock = sinon
      .mock('sendEmail')
      .returns({
        promise: () =>
          Promise.resolve({
            ResponseMetadata: uuid.v4(),
            MessageId: uuid.v4(),
          }),
      })
      .atLeast(0);
    sinon.replace(ses, 'sendEmail', mock);
    return mock;
  },

  getEmails(sendEmailMock) {
    return sendEmailMock.args.map(arg => arg[0]);
  },
};

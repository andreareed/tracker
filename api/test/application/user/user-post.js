/* eslint-disable jest/valid-expect */

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const sinon = require('sinon')
const { expect } = Code;
const { it, describe, before, afterEach } = (exports.lab = Lab.script());

const getServer = require('../../server');
const { truncateAll } = require('../../helpers/db');
const { mockSes, getEmails } = require('../../helpers/mock-services');
const factory = require('../../helpers/factory');

describe('POST /users', () => {
  let server;

  before(async () => {
    server = await getServer();
    await server.initialize();
  });

  afterEach(async () => {
    sinon.restore()
    await truncateAll();
  });

  const defaultPayload = {
    first_name: 'Test',
    last_name: 'User',
    email: 'andrea+aws@codereed.com',
    password: 'password',
    confirmPassword: 'password',
  };

  const makeRequest = async (payload = defaultPayload) => {
    return server.inject({
      method: 'POST',
      url: `/users`,
      payload,
    });
  };

  it(`responds with a 200 with a user object`, async () => {
    mockSes();
    const res = await makeRequest();

    expect(res.statusCode).to.equal(200);
    expect(res.result.id).to.exist();
    expect(res.result.token).to.exist();
    expect(res.result.first_name).to.equal(defaultPayload.first_name);
    expect(res.result.last_name).to.equal(defaultPayload.last_name);
    expect(res.result.email).to.equal(defaultPayload.email);
    expect(res.result.password).to.not.exist();
  });

  it(`responds with a 200 and sends a registration email`, async () => {
    const emailMock = mockSes();

    const res = await makeRequest();
    const emails = getEmails(emailMock)

    expect(res.statusCode).to.equal(200);
    expect(emails.length).to.equal(1);
    expect(emails[0].Destination.ToAddresses.length).to.equal(1);
    expect(emails[0].Destination.ToAddresses[0]).to.equal(defaultPayload.email);
  });

  it(`responds with a 400 if missing a required field`, async () => {
    const res = await makeRequest({ ...defaultPayload, first_name: null });
    expect(res.statusCode).to.equal(400);
  });

  it(`responds with a 400 if email is invalid`, async () => {
    const res = await makeRequest({ ...defaultPayload, email: 'notAnEmail' });
    expect(res.statusCode).to.equal(400);
  });

  it(`responds with a 400 if passwords do not match`, async () => {
    const res = await makeRequest({ ...defaultPayload, confirmPassword: 'noMatch' });
    expect(res.statusCode).to.equal(400);
  });

  it(`responds with a 400 if the email already exists`, async () => {
    await factory.create('user', { email: defaultPayload.email });
    const res = await makeRequest();

    expect(res.statusCode).to.equal(409);
    expect(res.result.message).to.equal('This email address is already in use');
  });
});

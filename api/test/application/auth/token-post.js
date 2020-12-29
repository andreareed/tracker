/* eslint-disable jest/valid-expect */

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const { expect } = Code;
const { it, describe, before, afterEach } = (exports.lab = Lab.script());

const getServer = require('../../server');
const { truncateAll } = require('../../helpers/db');
const factory = require('../../helpers/factory');

describe('POST /auth/token', () => {
  let server, user, password;

  before(async () => {
    server = await getServer();
    await server.initialize();

    password = 'password';
    user = await factory.create('user', {}, { password });
  });

  afterEach(async () => {
    await truncateAll();
  });

  const makeRequest = async overrides => {
    return server.inject({
      method: 'POST',
      url: `/auth/token`,
      payload: Object.assign(
        {
          email: user.email,
          password,
        },
        overrides
      ),
    });
  };

  it(`responds with a 200 and user object`, async () => {
    const res = await makeRequest();

    expect(res.statusCode).to.equal(200);
    expect(res.result.id).to.exist();
    expect(res.result.token).to.exist();
    expect(res.result.id).to.equal(user.id);
    expect(res.result.first_name).to.equal(user.first_name);
    expect(res.result.last_name).to.equal(user.last_name);
    expect(res.result.password).to.not.exist();
  });

  it(`responds with a 401 if the user is not registered`, async () => {
    const res = await makeRequest({ email: 'unregistered@user.com', password: 'somePassword' });

    expect(res.statusCode).to.equal(401);
    expect(res.result.message).to.equal('Incorrect email address or password');
  });

  it(`responds with a 401 if the password is wrong`, async () => {
    const res = await makeRequest({ password: 'wrongPassword' });

    expect(res.statusCode).to.equal(401);
    expect(res.result.message).to.equal('Incorrect email address or password');
  });

  it(`responds with a 401 if the email is wrong`, async () => {
    const res = await makeRequest({ email: 'wrong@email.com' });

    expect(res.statusCode).to.equal(401);
    expect(res.result.message).to.equal('Incorrect email address or password');
  });

  it(`responds with a 400 if a email is not provided`, async () => {
    const res = await makeRequest({ email: null });
    expect(res.statusCode).to.equal(400);
  });

  it(`responds with a 400 if a password is not provided`, async () => {
    const res = await makeRequest({ password: null });
    expect(res.statusCode).to.equal(400);
  });
});

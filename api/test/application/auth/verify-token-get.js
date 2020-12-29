/* eslint-disable jest/valid-expect */

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const uuid = require('uuid');
const { expect } = Code;
const { it, describe, before, afterEach } = (exports.lab = Lab.script());

const getServer = require('../../server');
const { truncateAll } = require('../../helpers/db');
const { getTokenForUser } = require('../../helpers/tokens');
const factory = require('../../helpers/factory');

describe('GET /auth/verify-token', () => {
  let server, user, validToken;

  before(async () => {
    server = await getServer();
    await server.initialize();

    user = await factory.create('user');
    validToken = await getTokenForUser(user);
  });

  afterEach(async () => {
    await truncateAll();
  });

  const makeRequest = async token => {
    return server.inject({
      method: 'GET',
      url: `/auth/verify-token`,
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  it(`responds with a 200 and user object`, async () => {
    const res = await makeRequest(validToken);

    expect(res.statusCode).to.equal(200);
    expect(res.result.id).to.exist();
    expect(res.result.token).to.exist();
    expect(res.result.id).to.equal(user.id);
    expect(res.result.first_name).to.equal(user.first_name);
    expect(res.result.last_name).to.equal(user.last_name);
    expect(res.result.password).to.not.exist();
  });

  it(`responds with a 401 if the token is not valid`, async () => {
    const res = await makeRequest(uuid.v4());

    expect(res.statusCode).to.equal(401);
  });
});

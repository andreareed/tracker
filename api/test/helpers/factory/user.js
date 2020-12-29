const User = require('../../../src/application/user/User');
const userService = require('../../../src/application/user/user-service');

const initialize = factory => {
  factory.define('user', User, buildOptions => {
    const { textPassword } = buildOptions;
    const password = userService.hashPassword(textPassword || 'password');

    return {
      id: factory.chance('guid', { version: 4 }),
      first_name: 'Test',
      last_name: 'User',
      email: factory.chance('email'),
      password,
      created_at: factory.chance('date'),
    };
  });
};

module.exports = initialize;

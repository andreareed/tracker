const JWT = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
  getTokenForUser: async user => {
    if (!user) {
      throw new Error('signJWT: no user provided');
    }

    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    return JWT.sign(payload, config.auth.jwtSecret, {
      algorithm: 'HS256',
      expiresIn: '14d',
    });
  },
};

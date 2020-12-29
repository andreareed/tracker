const Boom = require('boom');

const service = require('./user-service');
const authService = require('../auth/auth-service');
const emailService = require('../../lib/email/email-service');

module.exports = {
  async registerUser(request) {
    const { payload } = request;
    delete payload.confirmPassword;

    const emailExists = await service.findByEmail(payload.email);

    if (emailExists) {
      throw Boom.conflict('This email address is already in use');
    }

    const user = await service.create(payload);
    delete user.password;

    await emailService.send({
      to: payload.email,
      subject: 'Welcome to App',
      html: emailService.generateHtmlFromTemplate('emailVerification', {
        first_name: payload.first_name,
        link: 'https://codereed.com',
      }),
    });

    user.token = await authService.signJWT(user);
    return user;
  },
};

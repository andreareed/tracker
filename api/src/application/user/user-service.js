const bcrypt = require('bcrypt');
const User = require('./User');

module.exports = {
  async hashPassword(plaintextPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(plaintextPassword, salt, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });
    });
  },

  async create({ first_name, last_name, password, email }) {
    const hashedPassword = await this.hashPassword(password);

    return User.query().insert({
      first_name,
      last_name,
      password: hashedPassword,
      email: email.toLowerCase(),
    });
  },

  async findByEmail(email) {
    return User.query()
      .where({ email: email.toLowerCase() })
      .first();
  },

  async findById(id) {
    return User.query()
      .where({ id })
      .first();
  },
};

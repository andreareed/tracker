const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const ses = require('../../lib/ses');
const config = require('../../../config');
const templates = require('./templates');

const defaultEmailWrapper = fs.readFileSync(path.join(__dirname, '../../../templates/layout/default.hbs'), 'utf8');

class Email {
  constructor() {
    this.templates = templates;
  }
  send(emailObject) {
    return new Promise((resolve, reject) => {
      if (!emailObject.to) {
        return reject(new Error('no to address provided'));
      }

      if (!emailObject.subject) {
        return reject(new Error('no subject provided'));
      }

      if (!emailObject.text && !emailObject.html) {
        return reject(new Error('no text or html body provided'));
      }

      var params = {
        Destination: {
          ToAddresses: [emailObject.to],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: Handlebars.compile(defaultEmailWrapper)({ content: emailObject.html }),
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: emailObject.subject,
          },
        },
        Source: config.email.defaultFrom,
        ReplyToAddresses: [emailObject.from || config.email.defaultFrom],
      };

      ses
        .sendEmail(params)
        .promise()
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  generateHtmlFromTemplate(templateName, properties) {
    return this.templates[templateName](properties);
  }
}

module.exports = new Email();

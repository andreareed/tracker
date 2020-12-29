const fs = require('fs');
const Handlebars = require('handlebars');

const templates = {
  emailVerification: '../../../templates/email-verification.hbs',
};

const readSourceFile = function(path) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(`${__dirname}/${path}`, 'utf8', (err, source) => {
        if (err) {
          reject(err);
        } else {
          resolve(Handlebars.compile(source));
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const readPromises = Object.keys(templates).map(name => {
  return new Promise((resolve, reject) => {
    readSourceFile(templates[name])
      .then(contents => {
        resolve({ name, contents });
      })
      .catch(e => reject(e));
  });
});

Promise.all(readPromises).then(templatesArray => {
  templatesArray.forEach(readTemplate => {
    templates[readTemplate.name] = readTemplate.contents;
  });
});

module.exports = templates;

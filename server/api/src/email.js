const config = require('../../config');
const mailgun = require('mailgun-js')({ apiKey: config.mailgunKey, domain: config.mailgunDomain });
const { filters, templates } = require('../lib');

function errorManager(message) {
  throw new Error(message);
}

module.exports = {
  /**
   * @param {String} data.from required
   * @param {String} data.to required
   * @param {String} data.subject required
   * @param {Object} data.messageData required
   * @param {String} data.template optional
   */
  sendEmail(data) {
    return new Promise((resolve, reject) => {
      try {
        const messageData = {
          from: process.env.MAIL_FROM,
        };

        const ignore = ['template', 'messageData', 'text'];

        // if template is set, use template, otherwise use raw text
        if (data.template) {
          messageData.html = templates.template(data.template, data.messageData);
        } else {
          messageData.text = data.text;
        }

        // check for required fields
        const required = filters.sendEmailPayloadRequired(data);
        if (required.error) {
          errorManager(required.message);
        }

        // filter each form field against data type, format and whitelist
        Object.keys(data).forEach((k) => {
          if (ignore.indexOf(k) === -1) {
            const filter = filters.sendEmailPayloadFilter(k, data[k]);
            if (filter.error) {
              errorManager(filter.message);
            }

            messageData[k] = data[k];
          }
        });

        mailgun.messages().send(messageData, (error, body) => {
          if (error) {
            errorManager('Email Send Error');
          } else {
            resolve(body.message);
          }
        });
      } catch (e) {
        reject(e.message);
      }
    });
  },
};

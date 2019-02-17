const mailService = require('./email');

function processContactRequest(body) {
  return Promise.all([
    mailService.sendEmail({
      to: process.env.CONTACT_EMAIL,
      subject: `Contact email from ${body.firstName} ${body.lastName}`,
      text: [
        `Name: ${body.firstName} ${body.lastName}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone}`,
        `Subject: ${body.subject}`,
        `Comment: ${body.comment}`,
      ].join('\n'),
    }),
    mailService.sendEmail({
      to: body.email,
      subject: 'Thanks for contacting us',
      text: 'We received your request. We will reply back shortly.',
    }),
  ]);
}

module.exports = {
  processContactRequest,
};

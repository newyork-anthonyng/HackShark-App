const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY
});

function sendEmail(emailAddress: string, { text, html, subject }: { text: string, html: string, subject: string }) {
  return mg.messages.create('sandboxcc347b6004c647a0b852b1802c6a3837.mailgun.org', {
    from: "Excited User <mailgun@YOUR_DOMAIN_NAME>",
    to: [emailAddress],
    subject,
    text,
    html
  })
  .then((msg: any) => console.log(msg))
  .catch((err: any) => console.log(err));
}

export default sendEmail;
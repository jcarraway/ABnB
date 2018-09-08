import * as nodemailer from 'nodemailer';

export const sendEmail = async (
  recipient: string,
  url: string,
  linkText: string
) => {
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.log(err);
    }
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    // Message object
    const message = {
      from: 'Sender Name <sender@example.com>',
      to: `Recipient <${recipient}>`,
      subject: 'Nodemailer is unicode friendly ✔',
      text: 'Hello to myself!',
      html: `
          <html>
            <body>
              <p>Testing Nodemailer - the world\'s most awesomest email service!</p>
              <a href=${url}>${linkText}</a>
            </body>
          </html>
        `,
    };

    transporter.sendMail(message, (err1, info) => {
      if (err1) {
        console.log('Error occurred. ' + err1.message);
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
};

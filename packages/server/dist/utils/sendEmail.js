"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
exports.sendEmail = (recipient, url, linkText) => __awaiter(this, void 0, void 0, function* () {
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
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
});
//# sourceMappingURL=sendEmail.js.map
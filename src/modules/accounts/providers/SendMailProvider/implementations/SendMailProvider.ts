import nodemailer from 'nodemailer';
import { ISendMailData, ISendMailProvider } from '../models/ISendMailProvider';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '0cf1e8d443daef',
    pass: '61b3accb7b744d',
  },
});

export class SendMailProvider implements ISendMailProvider {
  async sendMail({ subject, body, to }: ISendMailData) {
    await transport.sendMail({
      from: 'Equipe Pricification <gethioliveira@gmail.com>',
      to,
      subject,
      html: body,
    });
  }
}

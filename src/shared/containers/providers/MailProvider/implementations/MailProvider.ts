import nodemailer from 'nodemailer';
import { MAILTRAP_PASSWORD, MAILTRAP_USER } from '../../../../../config/constants';
import { ISendMailProvider } from '../../../../../modules/accounts/providers/SendMailProvider/models/ISendMailProvider';
import { ISendMailData } from '../models';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD,
  },
});

export class MailProvider implements ISendMailProvider {
  async sendMail({ subject, body, to }: ISendMailData) {
    await transport.sendMail({
      from: 'Equipe Precifica <gethioliveira@gmail.com>',
      to,
      subject,
      html: body,
    });
  }
}

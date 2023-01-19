import { NodemailerMailAdapter } from "./nodemailer-mail-adapter";

export interface SendMailData {
  to: string;
  subject: string;
  text?: string;
  html: string;
}

export interface MailAdapter {
  sendMail(data: SendMailData): Promise<void>;
}

export const mailAdapter = new NodemailerMailAdapter();

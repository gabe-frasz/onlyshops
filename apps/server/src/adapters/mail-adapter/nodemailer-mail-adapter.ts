import nodemailer from "nodemailer";

import { MailAdapter, SendMailData } from "./contract";

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    transporter.sendMail({
      from: "OnlyShops Team <salesteam@onlyshops.com>",
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: [
        "<div>",
        "<div style='margin-bottom: 80px; padding-right: 20px; padding-left: 20px;'>",
        "<h1 style='margin-top: 80px; margin-bottom: 20px; text-align: center;'>",
        "OnlyShops",
        "</h1>",
        "<p style='text-align: center;'>",
        "São Paulo, SP / BR",
        "</p>",
        "</div>",
        data.html,
        "<div style='margin-top: 40px; padding-right: 20px; padding-left: 20px; padding-bottom: 40px;'>",
        "<p style='margin-bottom: 20px; text-align: center;'>Want to check out all our products? We don't offer free shipping or any kind of shipping at all! <3</p>",
        "<p style='text-align: center;'>",
        "<a href='https://onlyshops.com/' style='text-decoration: none; color: #fff; background-color: #00a8f0; padding-top: 10px; padding-bottom: 10px; padding-right: 20px; padding-left: 20px; border-radius: 5px; margin-top: 40px;'>Shop Now</a>",
        "</p>",
        "</div>",
        "</div>",
      ].join(""),
    });
  }
}

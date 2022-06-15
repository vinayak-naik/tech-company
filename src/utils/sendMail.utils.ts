import nodemailer from "nodemailer";
import log from "../logger";
import config from "config";
import { MessageDocument } from "../model/message.model";

export async function sendMail(body: MessageDocument) {
  const { name, email, phone, service, description } = body;
  const senderEmail = config.get("senderEmail") as string;
  const senderEmailPassword = config.get("senderEmailPassword") as string;
  const receiverEmail1 = config.get("receiverEmail1") as string;
  const receiverEmail2 = config.get("receiverEmail2") as string;
  try {
    log.info("nodemailer is running");
    let transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: senderEmail,
        pass: senderEmailPassword,
      },
    });
    let info = await transporter.sendMail({
      from: senderEmail,
      to: `${receiverEmail1}`,
      subject: "New Client Message",
      text: "Hello world?",
      html: `<div>
      <b>Client Message</b>
      <ul>
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Phone: ${phone}</li>
      <li>Service: ${service}</li>
      <li>Description: ${description}</li>
      </ul>
      </div>`,
    });
    log.info("Email Sent Successfully" + info.messageId);
  } catch (error: any) {
    return error.message;
  }
}

import * as dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import mailGen from "../config/mailTemplate.js";

const sendMail = async (address) => {
  const styledHTML = mailGen();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mesagge = {
    from: "concurso@veranosoftys.cl",
    to: address,
    subject: `Ya estás concursando ☀ ✈`,
    html: styledHTML,
  };
  const send = await transporter.sendMail(mesagge);
};

export default sendMail;

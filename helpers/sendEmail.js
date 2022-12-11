const nodemailer = require("nodemailer");
const { SEND_MAIL_URL } = process.env;

const sendRegisterEmail = async ({ email, token }) => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4bcbc3644aabb6",
      pass: "16d84d52ffe40d",
    },
  });

  // const transport = nodemailer.createTransport({ SENDER });

  const url = `${SEND_MAIL_URL}api/users/verify/${token}`;

  const emailBody = {
    from: "info@phonebook.com",
    to: email,
    subject: "Please verify your email",
    html: `<a target="_blank" href=${url}>Open to verify </a>`,
    text: "",
  };
  const response = await transport.sendMail(emailBody);
  console.log("Email sent", response);
};
module.exports = sendRegisterEmail;

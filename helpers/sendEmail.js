const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: to,
    subject: subject,
    html: `
    <html>
    <body>
    ${text}
    </body>
    </html>
    `,
  };
  
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      //   console.error("Error sending email: ", error);
    } else {
      //   console.log("Email sent: ", info.response);
    }
  });
};

const sendBusinessEmail = async (to, subject, text, from, password) => {
  const mailOptions = {
    from,
    to: to,
    subject: subject,
    html: `
    <html>
    <body>
    ${text}
    </body>
    </html>
    `,
  };
  
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: from,
      pass: password,
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      //   console.error("Error sending email: ", error);
    } else {
      //   console.log("Email sent: ", info.response);
    }
  });
};

module.exports = { sendEmail, sendBusinessEmail };

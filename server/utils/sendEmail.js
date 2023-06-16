const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (options) => {
  const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  sgMail.send(mailOptions);
};

module.exports = sendEmail;

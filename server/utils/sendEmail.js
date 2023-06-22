const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (options) => {
  const mailOptions = {
    from: process.env.MAILSENDER,
    to: options.to,
    templateId: options.templateId,
    dynamicTemplateData: options.data,
  };

  sgMail
    .send(mailOptions)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error("=========== Email error ====================", error);
    });
};

module.exports = sendEmail;

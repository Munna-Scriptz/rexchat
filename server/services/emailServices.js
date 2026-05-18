const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: "xmunna079@gmail.com",
        pass: "scmjfonarschmcnf",
    },
});

const sendEmail = async ({ email, subject, item, template }) => {
    await transporter.sendMail({
        from: 'Rexify eCommerce',
        to: email,
        subject: subject,
        html: template(item),
    });
};

module.exports = { sendEmail };

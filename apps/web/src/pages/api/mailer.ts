import { createTransport } from "nodemailer";

export const mailer = async () => {
  const transporter = createTransport("SMTP", {
    port: 1025,
  });

  try {
    await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, laurent.sutterlity@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  } catch (error) {
    return console.log(error);
  }
};

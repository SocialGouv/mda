import { config } from "@common/config";
import { feedbackSchema } from "@common/feedback/validation";
import { type NextApiHandler } from "next";
import { createTransport } from "nodemailer";
import type SMTPConnection from "nodemailer/lib/smtp-connection";

interface FeedbackData {
  email: string;
  message: string;
  phoneNumber: string;
  profil: string;
}

const mailerConfig: SMTPConnection.Options = {
  host: config.server.mailer.host,
  port: config.server.mailer.smtp.port,
  secure: config.server.mailer.smtp.ssl,
  auth: {
    user: config.server.mailer.smtp.login,
    pass: config.server.mailer.smtp.password,
  },
};
const mailer = createTransport(mailerConfig);

// TODO: clean
const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
  }

  const data = req.body as FeedbackData;

  const parseResult = feedbackSchema.safeParse(data);
  if (!parseResult.success) {
    return res.status(400).json(parseResult.error);
  }

  try {
    await mailer.sendMail({
      from: config.server.mailer.from,
      to: config.server.mailer.from,
      replyTo: data.email,
      subject: `[FEEDBACK][${data.profil}] ${data.email ? data.email : "Anonyme"}`,
      text: `Profil : ${data.profil}
Email : ${data.email ? data.email : "Non renseignée"}
Numéro de téléphone : ${data.phoneNumber ? data.phoneNumber : "Non renseigné"}
Message : ${data.message}`,
    });

    res.status(200).send(null);
  } catch (error) {
    res.status(500).send(null);
    return console.error(error);
  }
};

export default handler;

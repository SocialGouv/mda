import { config } from "@common/config";
import { type NextApiHandler } from "next";

interface StrapiEvent {
  segment: string;
  type: keyof Strapi.Schemas;
}

const pageModelMapping = {
  "api::fiche-pratique.fiche-pratique": "/fiches-pratiques",
} as unknown as Record<keyof Strapi.Schemas, string>;

const strapiWebhookHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
  }

  if (req.headers.authorization !== `Bearer ${config.webhookRevalidateToken}`) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const event = req.body as StrapiEvent;
  console.log(`Revalidation asked`, { event });
  if (process.env.NODE_ENV === "development") {
    console.log("...but aborted because development.");
    return res.status(409).send({ message: "No revalidate webhook on development" });
  }

  await res.revalidate(`${pageModelMapping[event.type]}/${event.segment}`);

  res.status(200).send(null);
};

// eslint-disable-next-line import/no-default-export
export default strapiWebhookHandler;

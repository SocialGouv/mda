import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { JsonLd, type JsonLdProps } from "@components/utils/JsonLd";
import { Markdown } from "@components/utils/Markdown";
import { Alert, AlertTitle } from "@design-system";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";
import { type ContactPage } from "schema-dts";

import { FeedbackForm } from "./FeedbackForm";

const slug = "je-donne-mon-avis";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const pageData = await fetchStrapi("je-donne-mon-avis");
    const jeDonneMonAvis = pageData.data?.attributes;

    return {
      description: jeDonneMonAvis?.content,
      modifiedTime: jeDonneMonAvis?.updatedAt,
      publishedTime: jeDonneMonAvis?.publishedAt,
      slug,
      title: jeDonneMonAvis?.title as string,
    };
  },
});

const JeDonneMonAvisPage = async () => {
  const pageData = await fetchStrapi("je-donne-mon-avis", { populate: "deep" });
  const jeDonneMonAvis = pageData.data?.attributes;

  const jsonLd: JsonLdProps<ContactPage> = {
    type: "ContactPage",
    dateCreated: jeDonneMonAvis?.createdAt,
    dateModified: jeDonneMonAvis?.updatedAt,
    datePublished: jeDonneMonAvis?.publishedAt,
    name: jeDonneMonAvis?.title,
    slug,
  };

  return (
    <SimpleContentPage>
      <JsonLd {...jsonLd}></JsonLd>
      {jeDonneMonAvis?.title && <h1>{jeDonneMonAvis.title}</h1>}
      {jeDonneMonAvis?.content && <Markdown>{jeDonneMonAvis?.content}</Markdown>}
      {(jeDonneMonAvis?.alerts || []).map(alert => (
        <Alert type={alert.type} key={alert.id}>
          <AlertTitle as="h2">{alert.title}</AlertTitle>
          <Markdown>{alert.content}</Markdown>
        </Alert>
      ))}

      {jeDonneMonAvis && <FeedbackForm {...jeDonneMonAvis.feedbackForm} />}
    </SimpleContentPage>
  );
};

export default JeDonneMonAvisPage;

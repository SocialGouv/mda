import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { Alert, AlertTitle } from "@design-system";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

import { FeedbackForm } from "./FeedbackForm";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const head = await fetchStrapi("je-donne-mon-avis");
    return {
      title: head.data?.attributes.title as string,
      slug: "je-donne-mon-avis",
    };
  },
});

const JeDonneMonAvisPage = async () => {
  const pageData = await fetchStrapi("je-donne-mon-avis", { populate: "deep" });
  const jeDonneMonAvis = pageData.data?.attributes;

  return (
    <SimpleContentPage>
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

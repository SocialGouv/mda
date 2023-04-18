import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { Alert, AlertTitle } from "@design-system";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

import { FeedbackForm } from "./FeedbackForm";

const getData = () => {
  return fetchStrapi("je-donne-mon-avis", { populate: "deep" });
};

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const strapiData = await getData();
    return {
      title: strapiData.data?.attributes.title as string,
      slug: "je-donne-mon-avis",
    };
  },
});

const Page = async () => {
  const strapiData = await getData();
  const data = strapiData.data?.attributes;

  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && <Markdown>{data?.content}</Markdown>}
      {(data?.alerts || []).map(alert => (
        <Alert type={alert.type} key={alert.id}>
          <AlertTitle as="h2">{alert.title}</AlertTitle>
          <Markdown>{alert.content}</Markdown>
        </Alert>
      ))}

      {data && <FeedbackForm {...data.feedbackForm} />}
    </SimpleContentPage>
  );
};

export default Page;

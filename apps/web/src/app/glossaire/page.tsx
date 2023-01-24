import { SimpleContentPage } from "@components/base/SimpleContentPage";
import clsx from "clsx";

const tempData = [
  {
    title: "Firefox",
    id: "firefox",
    description:
      "Un navigateur Web libre, open-source, multi-plateforme développé par la Mozilla Corporation et des centaines de volontaires.",
  },
  {
    title: "Firefox",
    id: "firefox",
    description:
      "Un navigateur Web libre, open-source, multi-plateforme développé par la Mozilla Corporation et des centaines de volontaires.",
  },
  {
    title: "Firefox",
    id: "firefox",
    description:
      "Un navigateur Web libre, open-source, multi-plateforme développé par la Mozilla Corporation et des centaines de volontaires.",
  },
];

const Glossary = () => {
  return (
    <SimpleContentPage>
      <h1>Glossaire</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odit ipsam doloribus beatae, alias excepturi
        incidunt ullam, tempora voluptates voluptatibus sit dicta dignissimos, cum expedita aut molestias a perferendis
        distinctio!
      </p>
      <dl>
        {tempData.map((item, index) => (
          <div key={index} className={clsx(index > 0 && "fr-mt-2w")}>
            <dt className="fr-text--bold fr-text--lg fr-mb-0" id={item.id}>
              {item.title}
            </dt>
            <dd className="fr-m-0">{item.description}</dd>
          </div>
        ))}
      </dl>
    </SimpleContentPage>
  );
};

export default Glossary;

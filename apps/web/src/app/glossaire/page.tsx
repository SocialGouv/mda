import { SimpleContentPage } from "@components/base/SimpleContentPage";
import clsx from "clsx";

const tempData = [
  {
    title: "AAH",
    id: "aaH",
    description: "UAllocation aux adultes handicapés.",
  },
  {
    title: "AEEH",
    id: "aesh",
    description: "Allocation d'éducation enfants handicapés.",
  },
  {
    title: "AESH",
    id: "aesh",
    description:
      "Accompagnants des élèves en situation de Handicap (autrefois appelé AVS, auxiliaire de vie scolaire).",
  },
  {
    title: "AGED",
    id: "aged",
    description: "Allocation de garde d'enfant à domicile.",
  },
  {
    title: "AGEFIPH",
    id: "agefiph",
    description: "Association de Gestion du Fonds pour l’Insertion Professionnelle des Personnes Handicapées.",
    url: "https://www.agefiph.fr/ ",
  },
  {
    title: "ANECAMSP",
    id: "anecamsp",
    description: "Association Nationale des Équipes Contribuant A l’Action Médico Sociale Précoce.",
    url: "https://anecamsp.org/",
  },
  {
    title: "ANDPC",
    id: "andpc",
    description: "Agence Nationale pour le Développement Professionnel Continu",
    url: "https://www.agencedpc.fr/",
  },
  {
    title: "ANFH",
    id: "anfh",
    description: "Association Nationale pour la Formation permanente du personnel Hospitalier.",
    url: "https://www.anfh.fr/",
  },
  {
    title: "APE",
    id: "ape",
    description: "Allocation parentale d'éducation.",
  },
  {
    title: "APJE",
    id: "apje",
    description: "Allocation pour jeune enfant.",
  },
  {
    title: "AP-HP",
    id: "aphp",
    description: "Assistance publique des hôpitaux de Paris.",
  },
  {
    title: "ARS",
    id: "ars",
    description: "Agence régionale de santé.",
  },
  {
    title: "BSM",
    id: "bsm",
    description: "Bilan Sensori-Moteur.",
  },
  {
    title: "BST",
    id: "bst",
    description: "Behavior skill training.",
  },
  {
    title: "CAJ",
    id: "caj",
    description: "Centre d'accueil de jour.",
  },
  {
    title: "CCAS",
    id: "ccas",
    description: "Centre communal d'action sociale.",
  },
  {
    title: "CAMSP",
    id: "camsp",
    description: "Centre d’action médico-sociale précoce.",
  },
  {
    title: "CAPPEI",
    id: "cappei",
    description: "Certificat d’aptitude professionnelle aux pratiques de l’éducation inclusive.",
  },
  {
    title: "CASF",
    id: "casf",
    description: "Code de l’action sociale et des familles.",
  },
  {
    title: "CDAPH",
    id: "cdaph",
    description: "Commissions des droits et de l’autonomie des personnes handicapées.",
  },
  {
    title: "CHU",
    id: "chu",
    description: "Centre hospitalier universitaire.",
  },
  {
    title: "CHRU",
    id: "chru",
    description: "Centre hospitalier régional universitaire.",
  },
  {
    title: "CMP",
    id: "cmp",
    description: "Centre médico-psychologique.",
  },
  {
    title: "CMPP",
    id: "cmpp",
    description: "Centre médico-psycho-pédagogique.",
  },
  {
    title: "CNAF",
    id: "cnaf",
    description: "Caisse Nationale des allocations familiales",
    url: "https://caf.fr/",
  },
  {
    title: "CNAM",
    id: "cnam",
    description: "Caisse Nationale d’Assurance Maladie",
    url: "https://www.ameli.fr",
  },
  {
    title: "CNIA",
    id: "cnia",
    description: "Certificat national autisme.",
  },
  {
    title: "CNSA",
    id: "cnsa",
    description: "Caisse nationale pour la solidarité et l’autonomie",
    url: "https://www.cnsa.fr/",
  },
  {
    title: "CRAIF",
    id: "craif",
    description: "Centre ressource autisme d’Île de France.",
  },
  {
    title: "CRA",
    id: "cra",
    description: "Centre de ressources autisme.",
  },
  {
    title: "CREAI",
    id: "creai",
    description: "Centre régional pour l'enfance et l'adolescence inadapté.",
  },
  {
    title: "CRMH",
    id: "crmh",
    description: "Centre de Ressources MultiHandicap.",
  },
  {
    title: "DASEN",
    id: "dasen",
    description: "Directeur académique des services de l'Éducation nationale.",
  },
  {
    title: "DAR",
    id: "dar",
    description: "Dispositif d'autorégulation.",
  },
  {
    title: "DIA",
    id: "dia",
    description: "Délégation interministérielle à la stratégie nationale pour l’Autisme.",
  },
  {
    title: "DOM",
    id: "dom",
    description: "Département d’outre-mer.",
  },
  {
    title: "DSM-5",
    id: "dsm-5",
    description: "Manuel diagnostique et statistique des troubles mentaux, et des troubles psychiatriques.",
  },
  {
    title: "DU",
    id: "du",
    description: "Diplôme universitaire.",
  },
  {
    title: "DYS",
    id: "dys",
    description: "Dyslexie, dyspraxie, dysphasie, dyscalculie, dysorthographie",
  },
  {
    title: "EN",
    id: "en",
    description: "Éducation nationale.",
  },
  {
    title: "ESAT",
    id: "esat",
    description: "Établissement et service d'aide par le travail.",
  },
  {
    title: "ESMS",
    id: "esms",
    description: "Établissement ou service médico-social.",
  },
  {
    title: "ESS",
    id: "ess",
    description: "Équipe de suivi de scolarisation.",
  },
  {
    title: "FAM",
    id: "fam",
    description: "Foyer d'accueil médicalisé.",
  },
  {
    title: "FDT",
    id: "fdt",
    description: "Foyer à double tarification.",
  },
  {
    title: "FDV",
    id: "fdv",
    description: "Foyer de vie.",
  },
  {
    title: "FEDEEH",
    id: "fedeeh",
    description: "Fédération Etudiante pour une Dynamique Études et Emploi avec un Handicap.",
  },
  {
    title: "FH",
    id: "fh",
    description: "Foyer d'hébergement.",
  },
  {
    title: "FIPHFP",
    id: "fiphfp",
    description: "Fonds pour l’Insertion des Personnes Handicapées dans la Fonction Publique",
    url: "http://www.fiphfp.fr/",
  },
  {
    title: "GEM",
    id: "gem",
    description: "Groupement d’entraide mutuelle.",
  },
  {
    title: "GIS",
    id: "gis",
    description: "Groupement d’intérêt scientifique",
    URL: "https://itneuro.aviesan.fr/invitation-a-rejoindre-le-gis-autisme-et-troubles-du-neuro-developpement.html",
  },
  {
    title: "GNCRA",
    id: "gncra",
    description: "Groupement national des centres de ressources autisme.",
  },
  {
    title: "HAS",
    id: "has",
    description: "Haute autorité de santé.",
    url: "https://www.has-sante.fr/",
  },
  {
    title: "IA-DASEN",
    id: "ia-dasen",
    description: "Directeur académique des services de l’Éducation nationale.",
  },
  {
    title: "IEN de circonscription",
    id: "ien-de-circonscription",
    description: "Inspecteur de l’Éducation Nationale de circonscription ",
  },
  {
    title: "IEN-ASH",
    id: "ien-ash",
    description:
      "Inspecteurs de l’Éducation nationale chargés de l’adaptation scolaire et de la scolarisation des élèves handicapés.",
  },
  {
    title: "IME",
    id: "ime",
    description: "Institut médico-éducatif.",
  },
  {
    title: "IMP",
    id: "imp",
    description: "Institut médico-pédagogique.",
  },
  {
    title: "IMPRO",
    id: "impro",
    description: "Institut médico-professionnel.",
  },
  {
    title: "INRA",
    id: "inra",
    description: " Institut national de recherche agronomique.",
  },
  {
    title: "INSERM",
    id: "inserm",
    description: "Institut national de la santé et de la recherche médicale.",
  },
  {
    title: "INSHEA",
    id: "inshea",
    description:
      "Institut national supérieur de formation et de recherche pour l’éducation des jeunes handicapés et les enseignements adaptés.",
    url: "www.inshea.fr/index.php",
  },
  {
    title: "MAS",
    id: "mas",
    description: "Maison d'accueil spécialisée.",
  },
  {
    title: "MDPH",
    id: "mdph",
    description: "Maison départementale des personnes handicapées.",
  },
  {
    title: "MPH",
    id: "mph",
    description: "Mon parcours handicap",
    url: "www.monparcourshandicap.gouv.fr ",
  },
  {
    title: "MS",
    id: "ms",
    description: "Médico-social.",
  },
  {
    title: "OETH",
    id: "oeth",
    description: "Obligation d'emploi de travailleur handicapé.",
  },
  {
    title: "ONDAM",
    id: "ondam",
    description: "Objectif national de dépenses d’assurance maladie.",
  },
  {
    title: "PAI",
    id: "pai",
    description: "Projet d'accueil individualisé.",
  },
  {
    title: "PAP",
    id: "pap",
    description: "Plan d’accompagnement personnalisé.",
  },
  {
    title: "PCH",
    id: "pch",
    description: "Prestation de compensation du handicap.",
  },
  {
    title: "PIA",
    id: "pia",
    description: "Projet individualisé d’accompagnement.",
  },
  {
    title: "PPI",
    id: "ppi",
    description: "Projet pédagogique individuel.",
  },
  {
    title: "PPS",
    id: "pps",
    description: "Projet personnalisé de scolarisation.",
  },
  {
    title: "PUPH",
    id: "puph",
    description: "Professeur des universités - praticien hospitalier.",
  },
  {
    title: "RBPP",
    id: "rbpp",
    description: "Recommandation des bonnes pratiques professionnelles.",
  },
  {
    title: "SAAD",
    id: "saad",
    description: "Service d'aide et d'accompagnement à domicile.",
  },
  {
    title: "SAJ",
    id: "saj",
    description: "Service d'accueil de jour.",
  },
  {
    title: "SAJH",
    id: "sajh",
    description: "Service d'accueil de jour et d'hébergement.",
  },
  {
    title: "SAMSAH",
    id: "samsah",
    description: "Service d'accompagnement médico-social pour adultes handicapés.",
  },
  {
    title: "SAS",
    id: "sas",
    description: "Section d'accompagnement spécialisé.",
  },
  {
    title: "SDEI",
    id: "sdei",
    description: "Service Départemental de l'Ecole Inclusive.",
  },
  {
    title: "SEGPA",
    id: "segpa",
    description: "Sections d’enseignement général adapté.",
  },
  {
    title: "SESSAD",
    id: "sessad",
    description: "Service d’éducation spéciale et de soins à domicile.",
  },
  {
    title: "SPF",
    id: "spf",
    description: "Santé Publique France.",
  },
  {
    title: "TED",
    id: "ted",
    description: "Troubles envahissants du développement.",
  },
  {
    title: "TND",
    id: "tnd",
    description: "Troubles du neuro-développement.",
  },
  {
    title: "TSA",
    id: "tsa",
    description: "Troubles du spectre de l’autisme.",
  },
  {
    title: "TDA/H",
    id: "tdah",
    description: "Trouble du déficit de l’attention avec ou sans hyperactivité.",
  },
  {
    title: "TDI",
    id: "tdi",
    description: "Trouble du développement intellectuel.",
  },
  {
    title: "TSLA",
    id: "tsla",
    description: "Troubles spécifiques du langage et des apprentissages.",
  },
  {
    title: "UEEA",
    id: "ueea",
    description: "Unité d’enseignement en élémentaire Autisme",
  },
  {
    title: "UEMA",
    id: "uema",
    description: "Unités d’enseignement en maternelle Autisme",
  },
  {
    title: "UFR",
    id: "ufr",
    description: "Unités de formations et de recherche",
  },
  {
    title: "ULIS",
    id: "ulis",
    description: "Unités localisées pour l’inclusion scolaire.",
  },
  {
    title: "UNAFORIS",
    id: "unaforis",
    description: "Union Nationale des Acteurs de Formation et de Recherche en Intervention Sociale.",
    url: "https://www.unaforis.eu/dossiers-thematiques/troubles-du-spectre-de-lautisme",
  },
  {
    title: "UNAPEI",
    id: "unapei",
    description: "Union nationale des associations de parents d’enfants inadaptés.",
  },
  {
    title: "UPI",
    id: "upi",
    description: "Unité pédagogique d'intégration.",
  },
];

const Glossary = () => {
  return (
    <SimpleContentPage>
      <h1>Glossaire</h1>
      <p>Glossaire fourni par la DIA.</p>
      <dl>
        {tempData.map((item, index) => (
          <div key={index} className={clsx(index > 0 && "fr-mt-2w")}>
            {item.url ? (
              <>
                <dt className="fr-text--bold fr-text--lg fr-mb-0" id={item.id}>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                </dt>

                <dd className="fr-m-0">{item.description}</dd>
              </>
            ) : (
              <>
                <dt className="fr-text--bold fr-text--lg fr-mb-0" id={item.id}>
                  {item.title}
                </dt>
                <dd className="fr-m-0">{item.description}</dd>
              </>
            )}
          </div>
        ))}
      </dl>
    </SimpleContentPage>
  );
};

export default Glossary;

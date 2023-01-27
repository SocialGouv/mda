import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { ButtonAsLink } from "@design-system";
import { CollapsedSectionDynamicGroup } from "@design-system/client";

const AutismHouse = () => {
  return (
    <SimpleContentPage>
      <ActionsButtons />
      <h1>La Maison de l'autisme</h1>
      <p className="fr-text--xl">
        La Maison de l’autisme n’est plus un projet mais une réalité. En cours de construction avec ses futurs usagers,
        elle ouvrira ses portes physiques et numériques au 2ème trimestre 2023.
      </p>
      <CollapsedSectionDynamicGroup
        data={[
          {
            content: (
              <>
                <p>
                  La Maison de l’autisme informera et accompagnera les personnes autistes, leurs proches et leurs
                  aidants dans leurs parcours de vie. Elle sera un lieu de vie, de joie et de rencontre pour les
                  personnes autistes, leurs familles, les professionnels, les associations et le grand public. Elle
                  proposera également une programmation culturelle, scientifique et artistique.
                </p>
                <p>
                  Elle formera les professionnels au contact des personnes autistes. Elle mettra à la disposition des
                  usagers des solutions innovantes, intelligentes et accessibles à tous pour améliorer concrètement le
                  quotidien des personnes autistes et de leurs parents.{" "}
                </p>
                <p>
                  Elle sera la référence de l’autisme en France, pour que les Français connaissent mieux l’autisme, la
                  diversité neurodéveloppementale et les handicaps invisibles.
                </p>
                <p>Elle sera exemplaire en termes de formation du personnel et d’accessibilité universelle.</p>
              </>
            ),
            id: "quelles-sont-les-missions-de-la-maison-de-lautisme",
            title: "Quelles sont les missions de la Maison de l’autisme ?",
          },
          {
            content: (
              <>
                <p>
                  Des études d’impact de la stratégie nationale autisme menées entre 2019 et 2021 ont soulevé un déficit
                  d’informations fiables à destination des personnes autistes et de leurs proches (familles, aidants…).
                </p>
                <p>
                  Lors de la Conférence Nationale du Handicap du 11 février 2020, le Président de la République a
                  annoncé la création d’une “maison de l’autisme” comme lieu de ressources, de rencontres et
                  d’accompagnement des personnes dans l’accès et l’exercice de leurs droits.
                </p>
              </>
            ),
            id: "quelle-est-lhistoire-de-la-maison-de-lautisme",
            title: "Quelle est l’histoire de la Maison de l’autisme ? ",
          },
          {
            content: (
              <>
                <p>L’ouverture des services dans la Maison de l’autisme sera progressive.</p>
                <p>
                  À la Maison de l’autisme, les usagers pourront rencontrer des personnels formés (médecin, psychologue,
                  assistant social, enseignant, éducateur spécialisé…) qui les accompagneront dans leurs parcours de vie
                  et leurs démarches.
                </p>
                <p>
                  Les usagers pourront aussi échanger avec leurs pairs ou tout simplement rencontrer des nouvelles
                  personnes qui partagent la même envie de créer du lien.
                </p>
                <p>
                  La Maison de l’autisme sera également un laboratoire où les associations et entreprises porteuses de
                  projets innovants pourront se faire conseiller (études de faisabilité du projet et conseils à sa
                  réalisation : état des lieux, méthodologie du projet et mise en lien avec des acteurs associatifs,
                  institutionnels et politiques).{" "}
                </p>
                <p>
                  Se rendre à la Maison de l’autisme aura également un intérêt pour le grand public et toute personne
                  pas directement concernée par l’autisme ou les troubles du neurodéveloppement : elle accueillera des
                  expositions, donnera de la visibilité à des artistes autistes, organisera des conférences, diffusera
                  des films et des documentaires, organisera des signatures d’ouvrages…{" "}
                </p>
              </>
            ),
            id: "a-quoi-sert-la-maison-de-lautisme-quel-interet-dy-aller",
            title: " À quoi sert la Maison de l’autisme ? Quel intérêt d'y aller ?",
          },
          {
            content: (
              <>
                <p>
                  La Maison de l'autisme sera dans un premier temps co-animée par le Groupement National des Centres de
                  Ressources Autisme, le Centre de Ressources Autisme en Île-de-France et Autisme Info Service, puis par
                  d’autres associations.
                </p>
                <p>
                  Pour plus d’information et contacter ces acteurs en direct, rendez-vous sur leurs sites
                  internet&nbsp;:
                </p>
                <ul>
                  <li>
                    <a href="https://www.autismeinfoservice.fr/" target="_blank" rel="noreferrer">
                      Autisme Info Service
                    </a>
                  </li>
                  <li>
                    <a href="https://www.autismeinfoservice.fr/" target="_blank" rel="noreferrer">
                      https://www.craif.org/
                    </a>
                  </li>
                  <li>
                    <a href="https://gncra.fr/" target="_blank" rel="noreferrer">
                      Groupement National des Centres Ressources Autisme
                    </a>
                  </li>
                </ul>
              </>
            ),
            id: "quels-acteurs-composeront-la-maison-de-lautisme",
            title: "Quels acteurs composeront la Maison de l’autisme ?",
          },
          {
            content: (
              <>
                <p>
                  Il sera naturellement possible de se rendre à la Maison de l’autisme avec son enfant ou son
                  adolescent.
                </p>
                <p>
                  Pendant que le parent ou l’aidant sera en rendez-vous ou participera à un événement de la
                  programmation (visionnage d’une projection, rencontre avec un auteur…), l’enfant ou l’adolescent
                  disposera d’outils, d’équipements et de services : dans un dispositif sensoriel avec des contenus
                  pédagogiques, il pourra se ressourcer en sécurité, en silence ou en immersion dans des univers
                  apaisants et stimulants ou rejoindre un groupe de lecture dans d’excellentes conditions acoustiques.
                </p>
                <p>Il pourra grimper en escalade en sécurité sur un mur dédié. </p>
                <p>
                  Il pourra jouer d’instruments de musique sans importuner les autres usagers, en sécurité pour lui et
                  pour les autres et sans risque d’endommager le matériel.{" "}
                </p>
              </>
            ),
            id: "est-ce-que-je-pourrai-y-aller-avec-mon-enfant-qui-pourra-le-garder-sur-place",
            title: "Est-ce que je pourrai y aller avec mon enfant ? Qui pourra le garder sur place ?",
          },
          {
            content: (
              <>
                <p>
                  Tout d’abord, les usagers seront bien accueillis dès la porte d’entrée extérieure. Le point d’accueil
                  sera clairement identifié et les usagers pourront, dès leur arrivée, se renseigner en direct sur la
                  programmation de la Maison de l’autisme mais aussi le trafic des transports en commun, la météo…
                </p>
                <p>
                  Dès l’entrée, dans l’enceinte, les usagers pourront si besoin s’isoler complètement dans une salle
                  dédiée, dans un cadre sécurisant et sans sollicitations diverses.
                </p>
                <p>
                  Les usagers pourront accéder à des informations fiables et à jour sur l’autisme et d’autres troubles
                  du neuro-développement (annuaires, recommandations de bonnes pratiques, revues et newsletters
                  scientifiques, jeux et contenus pédagogiques…).
                </p>
                <p>
                  Les visiteurs pourront consulter ces ressources sur place dans un cadre confortable et apaisant, dans
                  l’espace central dédié ou dans des alcôves permettant de s’isoler partiellement et de pouvoir voir
                  tout en se trouvant dans un espace distinct. Les usagers pourront également emprunter des ouvrages.
                </p>
                <p>
                  Les usagers auront aussi accès à des contenus audiovisuels (podcasts, émissions…). La Maison de
                  l’autisme permettra aux associations de produire leurs contenus grâce à son service de studio
                  d’enregistrement. La Maison de l’autisme mettra des fiches pratiques tutoriels par thème (une fiche et
                  une vidéo) à la disposition des usagers.
                </p>
                <p>
                  Les usagers, adultes, adolescents et enfants, pourront participer à des conférences, à des groupes de
                  méditation, de yoga, de lecture, de danse… Rencontrer des auteurs et des réalisateurs, assister à des
                  productions artistiques…
                </p>
                <p>
                  La Maison de l’autisme sera dotée d’une salle sensorielle qui surchargera les sensations pour mieux
                  présenter les solutions. Dans cette salle, les usagers pourront trouver des équipements innovants et
                  intelligents (balle anti-stress, casque de réalité virtuelle, ballon d’Intervention Thérapeutique lors
                  de Conduites Agressives…) accessibles à tous, à tester sur place ou à emprunter pour tester chez soi
                  ou sur son lieu de travail, pour rendre la vie des personnes autistes plus simple. La notice de prise
                  en main de l’outil intégrera les retours d’expérience des usagers et des professionnels sur ses
                  intérêts, ses limites et son contexte d’utilisation (questionnaire, fiche utilisateur…).
                </p>
                <p>
                  Un système de prêts de matériel, des boîtes et des caisses à dons de matériel sont également prévus et
                  si nécessaire une formation gratuite à l’usage.
                </p>
                <p>Les usagers pourront par ailleurs visualiser des scènes de vie (classe).</p>
                <p>
                  Les usagers pourront se retrouver et se restaurer au Café de la Maison de l’autisme, qui emploiera des
                  personnes autistes. La carte du Café sera accessible. Le personnel sera formé, bienveillant, à
                  l'écoute et saura gérer les comportements des personnes autistes. L’esprit sera celui d’un café
                  informel.
                </p>
                <p>
                  La Maison de l’autisme proposera un espace d’échanges modulable, où les usagers pourront se réunir en
                  petit comité pour des moments d’échanges informels. Cet espace permettra de respecter la
                  confidentialité pour des entretiens de recrutement, par exemple.
                </p>
              </>
            ),
            id: "quels-services-et-ressources-y-trouverai-je-sur-place",
            title: "Quels services et ressources y trouverai-je sur place ? ",
          },
          {
            content: (
              <>
                <p>La Maison physique de l’autisme sera accessible par métro, bus, RER et train.</p>
                <p>
                  Elle sera située à 5 minutes à pied de la station Front populaire sur la ligne 12 du métro parisien et
                  à 10 minutes à pied de la station de RER “la Plaine Stade de France”.
                </p>
                <p>
                  Elle sera située à 30 minutes en métro des gares parisiennes (Nord, Saint-Lazare, Est, Montparnasse,
                  Lyon, Austerlitz) en moyenne.
                </p>
                <p>
                  La station de métro Front Populaire est facile d’accès, en ce qu’elle est équipée d'escalators et
                  d'ascenseurs sur tout le parcours entre la rue et le quai. Elle bénéficie de la lumière du jour et
                  d’une température ambiante toute l’année.
                </p>
                <p>
                  Un travail sur la signalétique et l’aménagement urbain est en cours pour que tous les usagers accèdent
                  très facilement à la Maison de l’autisme depuis leur domicile ou lieu de travail (Maison de l’autisme
                  repérable dès la sortie du métro, cheminement lisible et sans obstacle entre le métro et l’enceinte de
                  la Maison de l’autisme…).
                </p>
                <p>
                  La Maison numérique de l’autisme sera accessible 24h/24 7j/7 via le site internet. Elle permettra aux
                  usagers d’anticiper leur venue sur place grâce à une vidéo expliquant l’accès.
                </p>
                <p>
                  <ButtonAsLink href="https://goo.gl/maps/2CjQCW9Nku9Q87da9" target="_blank" rel="noreferrer">
                    Voir dans Google Maps
                  </ButtonAsLink>
                </p>
              </>
            ),
            id: "comment-pourrai-je-me-rendre-a-la-maison-de-lautisme",
            title: "Comment pourrai-je me rendre à la Maison de l’autisme ?",
          },
        ]}
      />
    </SimpleContentPage>
  );
};

export default AutismHouse;

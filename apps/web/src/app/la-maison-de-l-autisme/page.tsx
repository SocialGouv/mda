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
        La Maison de l’autisme n’est plus un projet, c’est une réalité. Elle se poursuit avec vous. Ses portes ouvriront
        à Aubervilliers dès avril prochain&nbsp;; en attendant nous avons hâte de recevoir votre avis sur ce site en
        version bêta.
      </p>
      <CollapsedSectionDynamicGroup
        data={[
          {
            content: (
              <>
                <p>
                  La Maison de l’autisme sera située au 10, rue Waldeck Rochet à Aubervilliers. Cette localisation est
                  aux portes de Paris.
                </p>
                <p>Vous accéderez à la Maison de l’autisme en train, bus, métro ou RER.</p>
                <p>
                  Si vous arrivez en métro, vous descendrez à la station Front Populaire sur la ligne 12, sortirez à la
                  sortie “rue Waldeck Rochet” et marcherez 5 minutes. Cette station de métro est récente et facile
                  d'accès. Elle est équipée d'escalators et d'ascenseurs sur tout le parcours entre la rue et le quai.
                  Elle bénéficie de la lumière du jour et d’une température ambiante toute l’année.
                </p>
                <p>
                  Si vous arrivez en RER, vous descendrez à “la Plaine Stade de France” sur le RER B et marcherez 10
                  minutes.
                </p>
                <p>
                  Si vous ne vivez pas en Île-de-France et que vous empruntez le réseau SNCF, vous accéderez à la Maison
                  de l’autisme en 30 minutes en métro à compter de votre arrivée à la gare (du Nord, Saint-Lazare, de
                  l’Est, Montparnasse, de Lyon, d’Austerlitz).
                </p>
                <p>
                  Nous avons prévu 10 places de parking dédiées. Elles seront reconnaissables grâce au logo de la Maison
                  de l’autisme. Par ailleurs, le parking de la Maison de l’autisme est accessible à tous les types de
                  véhicule.
                </p>
                <p>
                  Pour vous faciliter l’accès à la Maison de l'autisme, les équipes de la Maison de l’autisme et les
                  services locaux (Aubervilliers, Plaine Commune…) travaillent actuellement ensemble sur la signalétique
                  et l’aménagement urbain. L'objectif est que vous repériez la Maison de l’autisme dès la sortie du
                  métro, du bus et du RER grâce à son totem et que le chemin entre la station de bus, de métro et de RER
                  et la Maison de l’autisme soit clair et sans embûches.
                </p>
                <p>
                  Vous accéderez à la Maison de l'autisme 24h/24 7j/7 grâce à son futur site internet en .gouv.fr. Si
                  vous stressez ou souhaitez anticiper votre venue sur place, vous aurez accès à une vidéo en ligne vous
                  expliquant l’accès et à une visite virtuelle.
                </p>
                <p>Bienvenue à la Maison&nbsp;!</p>
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

          {
            content: (
              <>
                <p>
                  La Maison de l’autisme vous informera, vous accompagnera et vous formera, que vous soyez personne
                  autiste, proche aidant, association, professionnel au contact des personnes autistes, mais aussi
                  employeur, force de l’ordre, instituteur, collègue, professeur d’université…
                </p>
                <p>
                  La Maison de l’autisme sera un lieu de vie, de joie et de rencontre. Elle vous proposera une
                  programmation culturelle, artistique, scientifique…
                </p>
                <p>
                  Elle mettra aussi à votre disposition des solutions innovantes et intelligentes que vous pourrez
                  tester sur place ou emprunter. La Maison de l’autisme veut faciliter votre quotidien et vous aider à
                  l’améliorer concrètement.
                </p>
                <p>
                  Vous pourrez vous référer à la Maison de l’autisme si vous avez besoin ou envie de mieux connaître
                  l’autisme, les troubles du neurodéveloppement, la diversité neurodéveloppementale et les handicaps
                  invisibles.
                </p>
                <p>
                  La Maison de l’autisme sera exemplaire : ses équipes seront formées à l’autisme et sauront gérer des
                  situations qui peuvent être difficiles (crises, stress, etc.). De plus, elle sera une référence en
                  matière d'accessibilité universelle.
                </p>
              </>
            ),
            id: "quelles-sont-les-missions-de-la-maison-de-lautisme",
            title: "Quelles sont les missions de la Maison de l’autisme ?",
          },

          {
            content: (
              <>
                <p>
                  L’ouverture des services dans la Maison de l’autisme sera progressive. La Maison de l’autisme
                  diversifiera et améliorera son offre de services au fur et à mesure. Concrètement, cela veut dire que
                  des nouveaux services vous seront proposés au fil des mois et de vos retours. Cela veut dire également
                  que les horaires d’ouverture de la Maison de l’autisme seront de plus en plus larges. L’objectif est
                  que les équipes soient disponibles pour vous sur la plage horaire la plus large possible
                </p>
                <p>
                  À la Maison de l’autisme, vous pourrez rencontrer un éducateur spécialisé, un assistant social, un
                  médecin, un psychologue, un enseignant… Ces professionnels vous accompagneront et vous aideront dans
                  vos démarches (emploi, logement, Maison Départementale pour les Personnes Handicapées, Caisse
                  d'allocations familiales, autres démarches spécifiques aux situations de handicap…).
                </p>
                <p>
                  À la Maison de l’autisme, vous pourrez échanger avec des personnes qui rencontrent les mêmes
                  difficultés que vous au quotidien. Vous pourrez partager vos combats, vos victoires, vos projets et
                  vos astuces. Vous pourrez rencontrer des nouvelles personnes qui partagent la même envie que vous de
                  créer du lien.
                </p>
                <p>
                  Si vous portez un projet innovant, vous pourrez vous faire accompagner (votre projet est-il réalisable
                  ? Si oui, comment monter votre dossier ? À qui devez-vous demander une aide administrative et
                  financière ? Existe-t-il des personnes qui ont la même idée, qui ont déjà réalisé votre projet ou un
                  projet équivalent ? Comment pouvez-vous contacter ces personnes ? Comment pouvez-vous avoir accès à
                  des témoignages et retours d’expérience ?
                </p>
                <p>
                  Que vous soyez directement concerné par l’autisme et les troubles du neurodéveloppement ou juste
                  intéressé de mieux les connaître, la Maison de l’autisme vous proposera une programmation culturelle
                  et artistique. Si vous êtes une personne autiste et que vous êtes artiste, journaliste, écrivain,
                  musicien, peintre, dessinateur, scientifique… la Maison de l’autisme vous donnera une visibilité
                  supplémentaire. Vous pourrez y présenter vos œuvres et travaux (expositions, conférences, films,
                  séries, documentaires, dédicaces...).
                </p>
              </>
            ),
            id: "a-quoi-sert-la-maison-de-lautisme-quel-interet-dy-aller",
            title: "À quoi sert la Maison de l’autisme ? Quel intérêt d'y aller ?",
          },
          {
            content: (
              <>
                <p>
                  Vous trouverez facilement l’entrée de la Maison de l’autisme grâce à son logo et à son totem visible
                  depuis le métro, le bus et le RER. De la même manière, vous ne pourrez pas manquer l’accueil, grâce à
                  un aménagement et à un cheminement évident.{" "}
                </p>
                <p>
                  Si vous êtes à l’aise, vous serez immédiatement et chaleureusement accueilli. Mais il se peut que vous
                  hésitiez à rentrer, que vous arriviez épuisé ou que vous ayez besoin de temps avant d’entrer. Dans ce
                  cas, vous pourrez vous asseoir sur un banc dehors si vous n’avez pas trop froid en hiver. Vous pourrez
                  attendre et hésiter aussi longtemps que vous le souhaiterez, dehors, à l’abri du soleil et de la pluie
                  sous des auvents. Si vous arrivez très fatigué, avec un haut niveau de stress ou sur stimulé, vous
                  pourrez entrer et vous mettre directement à l’écart dans une salle sans bruit, sans lumière et sans
                  odeur.
                </p>
                <p>
                  Vous serez informé en direct de la programmation de la Maison de l’autisme et du trafic RATP et SNCF
                  grâce à un écran dès l’accueil.{" "}
                </p>
                <p>
                  Par le biais d’une circulation claire et évidente, vous pourrez ensuite vous diriger vers l’espace
                  d’information. Vous y trouverez des ressources que vous pourrez emprunter. Toute l’information que
                  vous trouverez sera fiable, à jour et conforme aux recommandations de bonnes pratiques de la Haute
                  Autorité de Santé. Vous pourrez consulter un annuaire de professionnels, des ouvrages, des revues, des
                  contenus numériques pédagogiques et interactifs, des podcasts, des émissions… Vous pourrez vous
                  adresser et demander conseil à des documentalistes.
                </p>
                <p>
                  Vous trouverez ensuite un espace de restauration. Vous pourrez y boire une bonne boisson chaude ou
                  vous rafraîchir en sirotant un bon thé glacé. Vous serez peut-être servi par des jeunes autistes
                  concernés par un trouble du développement intellectuel. Vous pourrez passer votre commande au moyen
                  d’une carte lisible, rédigée en FALC et en braille. Le personnel sera bienveillant, à l’écoute et
                  saura gérer des situations d’anxiété le cas échéant. Vous pourrez vous poser seul, à deux ou en
                  groupe. Si vous voulez avoir un échange confidentiel, vous pourrez tirer le rideau acoustique et vous
                  asseoir.
                </p>
                <p>
                  Si vous pénétrez l’espace capitonné juste à côté, vous pourrez enregistrer vos contenus numériques
                  (podcasts, vidéos, émissions…). L'utilisation de ce studio sera très simple grâce à des fiches
                  pratiques rédigées en FALC et en braille et grâce à des tutoriels par thème.
                </p>
                <p>
                  Au fond du rez-de-chaussée, vous pourrez vous asseoir sur des gradins confortables pour assister à une
                  conférence ou visionner une projection. Toutes les projections seront diffusées en “airplay” (en
                  direct) sur tous les écrans du rez-de-chaussée (l’écran de l’espace d’échanges en face du café, les
                  écrans des tablettes des alcôves…).
                </p>
                <p>
                  Que vous soyez au rez-de-chaussée ou à l’étage, vous ne risquerez pas de manquer le début de la
                  diffusion ou de l’événement, grâce à un système d’annonces sonores qui vous informeront du début de
                  chaque événement.
                </p>
                <p>
                  Vous pourrez vous asseoir sur des “galets” en feutrine confortable pour écouter la conférence par
                  terre, participer à un groupe de lecture ou de méditation, rencontrer un auteur, vous poser
                  confortablement pendant ou après une exposition… Dans ce même espace, vous pourrez suivre des cours de
                  danse ou de yoga.
                </p>
                <p>
                  Vous trouverez des outils intelligents (balle anti-stress, casque de réalité virtuelle, ballon
                  d’Intervention Thérapeutique lors de Conduites Agressives…). L’idée est que vous puissiez les tester
                  sur place ou les emprunter pour les tester chez vous ou sur votre lieu de travail. Tester ces outils
                  sera aisé. Une notice de “prise en main” intégrera les retours d’expérience des usagers et des
                  professionnels sur les intérêts, les limites et le contexte d’utilisation (questionnaire, fiche
                  utilisateur…). Un système de prêt de matériel et des boîtes et caisses à dons de matériel sont
                  également prévus, ainsi qu' une formation gratuite à l’usage si nécessaire.
                </p>
              </>
            ),
            id: "quels-services-et-ressources-y-trouverai-je-sur-place",
            title: "Quels services et ressources y trouverai-je sur place ?",
          },
          {
            content: (
              <>
                <p>
                  Il sera possible de vous rendre à la Maison de l’autisme avec votre enfant ou adolescent. Vous pourrez
                  le laisser en sécurité pendant que vous serez en rendez-vous ou participerez à un événement. Votre
                  enfant ou adolescent ne sera pas seul et livré à lui-même. Il pourra patienter en sécurité dans des
                  alcôves. Il pourra être seul ou avec d’autres personnes (enfants, adolescents, accompagnants…). Dans
                  ces alcôves, votre enfant ou adolescent aura accès à du contenu pédagogique, stimulant ou apaisant.
                  Votre enfant ou adolescent pourra aussi participer à un groupe de lecture dans d’excellentes
                  conditions acoustiques : une personne autiste s’est d’ores et déjà proposé de lire ou raconter des
                  histoires (contes, fables…).
                </p>
                <p>
                  Votre enfant ou adolescent pourra grimper sur un mur d’escalade dédié en sécurité, de manière autonome
                  ou avec un accompagnant.
                </p>
                <p>
                  Votre enfant ou adolescent pourra également jouer d’un instrument de musique. Cet instrument sera
                  conçu et installé de telle sorte que votre enfant puisse jouer sans risquer de se blesser,
                  d'importuner les autres usagers ou d’endommager le matériel.
                </p>
              </>
            ),
            id: "est-ce-que-je-pourrai-y-aller-avec-mon-enfant-qui-pourra-le-garder-sur-place",
            title: "Est-ce que je pourrai y aller avec mon enfant ? Qui pourra le garder sur place ?",
          },
          {
            content: (
              <>
                <p>La Maison de l'autisme sera co-animée dans un premier temps par&nbsp;:</p>
                <ul>
                  <li>
                    une équipe qui coordonne 27 autres équipes (1 par région). L’équipe qui coordonne est celle du
                    “groupement national des centres de ressources autisme”. Les 27 équipes sont celles des 27 centres
                    de ressources autisme.
                  </li>
                  <li>
                    l’équipe du centre de ressources autisme en Île-de-France. Cette équipe accueille, informe et
                    accompagne les personnes autistes, leurs familles et leurs aidants. Elle forme les professionnels.
                    Elle anime une programmation culturelle et artistique.
                  </li>
                  <li>
                    Une association qui s’appelle Autisme Info Service et qui oriente les personnes autistes et leurs
                    proches aidants par téléphone. Son numéro est le 0800 71 40 40.
                  </li>
                </ul>
                <p>D’autres équipes et associations pourront les rejoindre par la suite.</p>
                <p>
                  Pour plus d’information et pour contacter les équipes en direct, rendez-vous sur leurs sites
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
            title: "Qui animera la Maison de l’autisme ?",
          },
          {
            content: (
              <>
                <p>
                  Des études ont soulevé un manque d’informations fiables à votre disposition, que vous soyez personne
                  autiste, famille, aidant, association ou professionnel. Des fausses informations circulent encore sur
                  l’autisme, malgré le travail de la délégation, du ministère et de leurs partenaires.{" "}
                </p>
                <p>
                  Lors de la Conférence Nationale du Handicap du 11 février 2020, le Président de la République Emmanuel
                  Macron a annoncé la création d’une “maison de l’autisme”. Il a souhaité qu’elle soit un lieu de
                  ressources, de rencontres et d’accompagnement.
                </p>
              </>
            ),
            id: "quelle-est-lhistoire-de-la-maison-de-lautisme",
            title: "Quelle est l’histoire de la Maison de l’autisme ?",
          },
        ]}
      />
    </SimpleContentPage>
  );
};

export default AutismHouse;

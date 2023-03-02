import { SimpleContentPage } from "@components/base/SimpleContentPage";

const LegalNotice = () => {
  return (
    <SimpleContentPage>
      <h1>Mentions légales de la plateforme La Maison numérique de l’autisme.</h1>
      <h2>Éditeur de la Plateforme</h2>
      <p>
        La Plateforme est éditée par la{" "}
        <a href="https://www.fabrique.social.gouv.fr/" target="_blank" rel="noreferrer">
          Fabrique des Ministères sociaux
        </a>{" "}
        située&nbsp;:{" "}
      </p>
      <p>
        Tour Mirabeau
        <br />
        39-43 Quai André Citroën
        <br />
        75015 PARIS
        <br />
        Téléphone&nbsp;: 01 40 56 60 00
      </p>
      <h2>Directrice de la publication</h2>
      <p>
        Madame Claire COMPAGNON, Déléguée interministérielle à la stratégie nationale pour l'autisme au sein des
        troubles du neuro-développement.
      </p>
      <h2>Hébergement de la Plateforme</h2>
      <p>Ce site est hébergé par&nbsp;:</p>
      <p>
        Microsoft Azure France
        <br />
        37 Quai du Président Roosevelt
        <br />
        92130 Issy-les-Moulineaux
      </p>
      <h2>Accessibilité</h2>
      <p>
        La conformité aux normes d’accessibilité numérique est un objectif prioritaire, nous tâchons de rendre ce site
        accessible à toutes et à tous. Un audit est en cours de planification afin de pouvoir mettre à jour le statut
        d'accessibilité en bas de page.
      </p>
      <h2>En savoir plus</h2>
      <p>
        Pour en savoir plus sur la politique d’accessibilité numérique de l’État &nbsp;:{" "}
        <a href="https://accessibilite.numerique.gouv.fr/" target="_blank" rel="noreferrer">
          Référentiel général d’amélioration de l’accessibilité
        </a>
      </p>
      <h2>Signaler un dysfonctionnement</h2>
      <p>
        Si vous rencontrez un défaut d’accessibilité vous empêchant d’accéder à un contenu ou une fonctionnalité du
        site, merci de nous en faire part ici&nbsp;:{" "}
        <a href="mailto:DSI-incubateur@sg.social.gouv.fr">DSI-incubateur@sg.social.gouv.fr</a>
      </p>
      <p>
        Si vous n’obtenez pas de réponse rapide de notre part, vous êtes en droit de faire parvenir vos doléances ou une
        demande de saisine au Défenseur des droits.
      </p>
      <p>Pour le joindre, vous pouvez&nbsp;:</p>
      <ul>
        <li>
          Utiliser le formulaire de contact en ligne ici&nbsp;:{" "}
          <a
            href="https://formulaire.defenseurdesdroits.fr/code/afficher.php?ETAPE=accueil_2016"
            target="_blank"
            rel="noreferrer"
          >
            Défenseur des droits&nbsp;: formulaire de réclamation
          </a>
        </li>
        <li>Composer le 09 69 39 00 00 (du lundi au vendredi de 8h à 20h)</li>
        <li>
          Envoyer un courrier (sans timbre) à l’adresse suivante : Défenseur des droits, Libre réponse 71120, 75342
          Paris CEDEX 07.
        </li>
      </ul>
      <h2>Sécurité</h2>
      <p>
        Le site est protégé par un certificat électronique matérialisé pour la grande majorité des navigateurs par un
        cadenas. Cette protection participe à la confidentialité des échanges. En aucun cas, les services associés à la
        plateforme ne seront à l’origine d’envoi de courriels pour demander la saisie d’informations personnelles.
      </p>
    </SimpleContentPage>
  );
};

export default LegalNotice;

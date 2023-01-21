import {
  Container,
  FormGroup,
  FormGroupLabel,
  FormGroupStep,
  FormGroupSteps,
  FormSelect,
  Grid,
  GridCol,
  Notice,
} from "@design-system";

const Diagnostique = () => {
  return (
    <section className="fr-py-6w fr-py-md-12w fr-bg-grey-lightest">
      <Container>
        <Grid haveGutters justifyCenter>
          <GridCol md={10} lg={8} className="fr-bg-white fr-px-2w fr-py-4w fr-py-md-8w fr-px-md-12w">
            <h1 className="fr-h2 fr-text-center">Mon diagnostique</h1>
            <p>
              Je démarre un diagnostic auprès de mon médecin traitant puis je réalise un bilan fonctionnel détaillé
              auprès d'un ensemble de professionnels de santé.
            </p>
            <FormGroupSteps>
              <FormGroupStep>
                <FormGroup>
                  <FormGroupLabel htmlFor="xxx">Je suis</FormGroupLabel>
                  <FormSelect id="xxx">
                    <option value="1">Un parent ou un proche d’un enfant, d’un adulte</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                  </FormSelect>
                </FormGroup>
              </FormGroupStep>
              <FormGroupStep>
                <FormGroup>
                  <FormGroupLabel htmlFor="yyy">
                    Le rendez-vous avec un médecin traitant / pédiatre / médecin de la crèche ou le médecin de la
                    protection maternelle a-t’il été réalisé ?
                  </FormGroupLabel>
                  <FormSelect id="yyy">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                  </FormSelect>
                </FormGroup>
                <Notice isInsideContent>
                  <p>
                    La première étape pour initier un diagnostic est de prendre rendez-vous avec votre médecin traitant,
                    le pédiatre de votre enfant, ou bien le médecin de la crèche ou de la protection maternelle
                    infantile (PMI).
                  </p>
                </Notice>
              </FormGroupStep>
            </FormGroupSteps>
            <hr className="fr-mt-4w fr-mb-2w " />
            <div className="fr-content">
              <h2 className="fr-text--xl">
                Démarrez un bilan fonctionnel détaillé auprès de plusieurs professionnels de santé.
              </h2>
              <p>Ce sont ceux qu’on appelle les professionnels de 2e ligne&nbsp;:</p>
              <ul>
                <li>Psychologue</li>
                <li>Orthophoniste</li>
                <li>Psychomotricien</li>
              </ul>
              <p>
                <strong>Finalisez le parcours de diagnostic en prenant RDV auprès de votre médecin référent.</strong>
              </p>
              <ol>
                <li>Vous restitue les conclusions de ce parcours de diagnostic</li>
                <li>
                  Rédige un bilan final et un certificat médical vous permettant, le cas échéant, de mener une demande
                  d’ouverture de droits auprès de la Maison Départementale des Personnes Handicapées (MDPH).
                </li>
              </ol>
              <p>
                Pour les personnes dont le diagnostic s’avère complexe, un approfondissement du diagnostic est
                nécessaire en centre de diagnostic. C’est ce qu’on appelle les professionnels de 3e ligne.
              </p>
              <p>
                Tous ces examens visent à décrire le trouble de l’autisme de manière fine. Les professionnels doivent
                échanger les informations et les conclusions de leur propre observation pour mieux comprendre la
                personne autiste et ses troubles, et mettre en évidence ses capacités.
              </p>
              <p>
                Le bilan fonctionnel est un indicateur de la situation de handicap de la personne à un moment T. Il est
                nécessaire de réactualiser ce bilan fonctionnel régulièrement, pour tenir compte de l’évolution des
                capacités et des difficultés de la personne.
              </p>
            </div>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
};

export default Diagnostique;

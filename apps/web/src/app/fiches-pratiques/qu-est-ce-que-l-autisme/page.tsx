"use client";
import {
  CollapsedSection,
  CollapsedSectionGroup,
  CollapsedSectionGroupBody,
  CollapsedSectionGroupHead,
  Container,
  FormButton,
  SideMenu,
  SideMenuLink,
  SideMenuList,
} from "@design-system";
import { useState } from "react";

const FichePratique = () => {
  const [allSectionOpen, setAllSectionOpen] = useState(false);
  return (
    <section className="fr-py-md-12w">
      <Container>
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-md-4 fr-col-lg-3">
            <SideMenu buttonLabel="Sommaire des fiches pratiques">
              <SideMenuList>
                <SideMenuLink href="#" isCurrent>
                  Qu'est ce que l'autisme
                </SideMenuLink>
                <SideMenuLink href="#">Parcours de diagnostic</SideMenuLink>
                <SideMenuLink href="#">Dossier MDPH</SideMenuLink>
              </SideMenuList>
            </SideMenu>
          </div>
          <div className="fr-py-6w fr-pt-md-0 fr-col-12 fr-col-md-8 fr-col-lg-9">
            <h1>Qu’est ce que l’autisme&nbsp;?</h1>
            <p className="fr-text--xs">
              Vérifié le 8 novembre 2022 - Direction de l'information légale et administrative (Premier ministre)
            </p>
            <div className="fr-text--xl">
              <p>
                L’autisme est un trouble du neuro-développement précoce, qui impacte les capacités de communication, les
                interactions sociales et les comportements des personnes. Ce trouble va souvent de pair avec d’autres
                manifestations : hyper ou hypo sensibilité aux sons, lumières, odeur... , trouble du déficit de
                l’attention avec ou sans hyperactivité (TDAH), troubles “dys” (dyslexie, dyspraxie, dysphasie,...).
              </p>
              <p>
                Cette page a pour objectif de synthétiser ce trouble et ses caractéristiques dans une courte
                présentation : signes de manifestation, causes, facteurs de risque, prévalence, diagnostic, prise en
                charge, comorbidités.
              </p>
            </div>
            <div className="fr-mt-8w">
              <CollapsedSectionGroup>
                <CollapsedSectionGroupHead>
                  <FormButton variant="secondary" size="sm" onClick={() => setAllSectionOpen(!allSectionOpen)}>
                    {allSectionOpen ? "Tout déplier" : "Tout replier"}
                  </FormButton>
                </CollapsedSectionGroupHead>
                <CollapsedSectionGroupBody>
                  <CollapsedSection title="Qu’est ce que l’autisme ?">
                    <p>
                      L’autisme est un Trouble du Neuro-Développement (TND), qui se caractérise principalement
                      par&nbsp;:
                    </p>
                    <ul>
                      <li>les déficits persistants de la communication et des interactions sociales&nbsp;</li>
                      <li>le caractère restreint et répétitif des comportements, des intérêts et des activités.</li>
                    </ul>
                    <p>
                      Les Troubles du Neuro-Développement désignent l’altération d’un ou plusieurs mécanismes de
                      fonctionnement du cerveau&nbsp;: motricité, audition, vision, langage, communication, interactions
                      sociales…
                    </p>
                    <p>
                      Les TND regroupent également le trouble du déficit de l’attention avec ou sans hyperactivité
                      (TDAH), les troubles “dys” (dyslexie, dyspraxie, dysphasie,...) et les troubles du développement
                      intellectuel.
                    </p>
                    <p>
                      L’autisme peut s’exprimer chez les personnes concernées par une très large variété de
                      manifestations (voir ci-dessous “Signes de manifestation”), c’est pourquoi le terme de “Trouble du
                      Spectre de l’Autisme” (TSA) est utilisé. Par exemple, certaines personnes autistes peuvent avoir
                      une parfaite maîtrise du langage, alors que d’autres personnes ne parlent pas du tout.
                    </p>
                    <p>
                      Depuis 2013, les classifications scientifiques internationales ont renoncé à classer les types
                      d’autisme en grandes catégories (Kanner, Asperger, ...), et ont abandonné la notion, longtemps
                      utilisée, de « Troubles Envahissants du Développement » (TED), au profit de Trouble du Spectre de
                      l'Autisme (TSA).
                    </p>
                    <p>
                      Cette révision des termes étant récente, et parfois mal connue, il se peut que certaines personnes
                      utilisent encore cet ancien vocabulaire.
                    </p>
                  </CollapsedSection>
                  <CollapsedSection title="Signes de manifestation">
                    <h3>L’autisme se manifeste par&nbsp;:</h3>
                    <ol>
                      <li>
                        Des troubles de la communication : par exemple, peu ou pas du tout de langage, ou langage
                        bizarre, répétition inadaptée des derniers mots entendus ou de morceaux de phrases (ce qu’on
                        appelle des écholalies), communication non-verbale absente ou inadaptée, difficulté à exprimer
                        ses émotions, non-compréhension de l’implicite ou du second degré…{" "}
                      </li>
                      <li>
                        Des particularités dans les interactions sociales : par exemple, non adaptation des regards, du
                        respect des tours de paroles, incapacité à se mettre à la place de l'autre, à partager un
                        intérêt, hyper-perception, sens du détail…
                      </li>
                      <li>
                        Des activités ou intérêts obsessionnels : par exemple, le respect d’une routine et la
                        perturbation face à l’imprévu, la connaissance extrêmement approfondie pour un sujet spécifique
                        (train, météo, animaux)
                      </li>
                      <li>
                        Des comportements répétitifs : par exemple, répétition involontaire et rythmique des mêmes mots,
                        gestes ou rituels, actions répétitives (ce qu’on appelle des stéréotypies)
                      </li>
                    </ol>
                    <p>
                      L’autisme présente aussi souvent des hyper ou hypo sensibilités sensorielles (sons, lumière,
                      couleurs, toucher…).
                    </p>
                    <p>
                      Tous ces signes s’expriment avec des intensités variables, d’où le terme de “Trouble du Spectre de
                      l’Autisme”.
                    </p>
                    <h3>Exemples de signes spécifiques par tranche d’âge&nbsp;:</h3>
                    <h4>Entre 6 et 9 mois</h4>
                    <ul>
                      <li>Pas ou peu de contact visuel</li>
                      <li>Pas ou peu d’expressions de joie, de sourire</li>
                      <li>Pas ou peu d’échange, d’expressions faciales avec d’autres personnes</li>
                    </ul>
                    <h4>Entre 9 mois et 1 an</h4>
                    <ul>
                      <li>Pas ou peu de réponse à l’appel de son prénom</li>
                      <li>Pas ou peu de babillage</li>
                      <li>Pas ou peu de mouvement des mains comme le fait de pointer du doigt</li>
                    </ul>
                    <h4>Entre 1 et 2 ans</h4>
                    <ul>
                      <li>Pas ou peu de parole avec des mots, de phrases significatives, en dehors de l’imitation</li>
                    </ul>
                    <h4>A tous les âges</h4>
                    <ul>
                      <li>Perte de la parole ou de compétences de communication déjà acquises</li>
                      <li>Pas de contact visuel</li>
                      <li>Solitude, isolement, difficulté à interagir avec autrui</li>
                      <li>Obsessions débordantes ou intenses, routines, comportements répétitifs</li>
                      <li>Sur-réactions aux bruits, aux lumières, aux textures, aux odeurs, aux couleurs.</li>
                    </ul>
                  </CollapsedSection>
                </CollapsedSectionGroupBody>
              </CollapsedSectionGroup>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FichePratique;

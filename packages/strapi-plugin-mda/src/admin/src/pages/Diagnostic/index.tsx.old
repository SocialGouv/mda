/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import "reactflow/dist/style.css";
import "./index.css";

import { type Diag } from "@mda/strapi-types";
import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { ContentLayout, HeaderLayout } from "@strapi/design-system/Layout";
import { Link } from "@strapi/design-system/Link";
import { ArrowLeft } from "@strapi/icons";
import _ from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  type Edge,
  MiniMap,
  type Node,
  type NodeTypes,
  type ReactFlowInstance,
  type XYPosition,
} from "reactflow";

import { AnswerNode } from "../../components/mindmap/AnswerNode";
import { QuestionNode } from "../../components/mindmap/QuestionNode";
import { RootQuestionNode } from "../../components/mindmap/RootQuestionNode";
import { SubAnswerNode } from "../../components/mindmap/SubAnswerNode";
import baseJson from "./content.json";

let rootQuestion: Diag.Question = null as any;
const questionsSet = new Set<Diag.Question>();
const answersSet = new Set<Diag.Answer>();
const subanswersSet = new Set<Diag.SubAnswer>();

const edges: Edge[] = [];
const edgesIdSet = new Set<string>();

const EDGE_SPLIT = "~";
for (const elt of baseJson) {
  if (elt.attributes.answers) {
    const id = `question-${elt.id}`;
    if (elt.attributes.first) {
      rootQuestion = {
        ...elt.attributes,
        id,
        answers: elt.attributes.answers.map(answer => {
          const anwserId = `answer-${answer.id}`;
          edgesIdSet.add(`e${id}${EDGE_SPLIT}${anwserId}`);
          return anwserId;
        }),
        info: elt.attributes.info ?? "",
      };
    } else {
      questionsSet.add({
        ...elt.attributes,
        id,
        answers: elt.attributes.answers.map(answer => {
          const anwserId = `answer-${answer.id}`;
          edgesIdSet.add(`e${id}${EDGE_SPLIT}${anwserId}`);
          return anwserId;
        }),
        info: elt.attributes.info ?? "",
      });
    }

    for (const answer of elt.attributes.answers) {
      const answerId = `answer-${answer.id}`;
      if (answer.subanswers) {
        const answerDestinationId = String(answer.destination.data?.id ?? "");
        answersSet.add({
          ...answer,
          destination: answerDestinationId,
          id: answerId,
          info: answer.info ?? "",
          subanswers: answer.subanswers.map(subanswer => {
            const subanswerId = `subanswer-${subanswer.id}`;
            edgesIdSet.add(`e${answerId}${EDGE_SPLIT}${subanswerId}`);
            return subanswerId;
          }),
        });

        if (answerDestinationId) {
          edgesIdSet.add(`e${answerId}${EDGE_SPLIT}${answerDestinationId}`);
        }

        for (const subanswer of answer.subanswers) {
          const subanswerId = `subanswer-${subanswer.id}`;
          const destinationId = `question-${subanswer.destination.data.id}`;
          subanswersSet.add({
            ...subanswer,
            id: subanswerId,
            destination: destinationId,
            info: subanswer.info ?? "",
          });
          edgesIdSet.add(`e${subanswerId}-${destinationId}`);
        }
      }
    }
  }
}

const questions = _.sortBy(Array.from(questionsSet), "id");
const answers = _.sortBy(Array.from(answersSet), "id");
const subanswers = _.sortBy(Array.from(subanswersSet), "id");

edgesIdSet.forEach(id => {
  const [badSource, target] = id.split(EDGE_SPLIT);
  edges.push({
    id,
    source: badSource.substring(1),
    target,
  });
});

console.log({ rootQuestion, questions, answers, subanswers, edges });

let baseX = -20;
let baseY = -20;
const getY = () => (baseY < 0 ? (baseY = Math.abs(baseY) + 20) : (baseY = -baseY));
const randXY = (): XYPosition => ({ x: (baseX += 20), y: getY() });

const initialNodes: Array<Node<Diag.Answer | Diag.Question | Diag.SubAnswer>> = [
  {
    id: rootQuestion.id,
    position: { x: 0, y: 0 },
    data: rootQuestion,
    type: RootQuestionNode.nodeName,
  },
  ...questions.map<Node<Diag.Question>>(question => ({
    id: question.id,
    position: randXY(),
    data: question,
    type: QuestionNode.nodeName,
  })),
  ...answers.map<Node<Diag.Answer>>(answer => ({
    id: answer.id,
    position: randXY(),
    data: answer,
    type: AnswerNode.nodeName,
  })),
  ...subanswers.map<Node<Diag.SubAnswer>>(subanswer => ({
    id: subanswer.id,
    position: randXY(),
    data: subanswer,
    type: SubAnswerNode.nodeName,
  })),
];
const initialEdges: Edge[] = [...edges];

const nodeColor = (node: Node) => {
  switch (node.type) {
    case RootQuestionNode.nodeName:
      return "#ad2a1a";
    case QuestionNode.nodeName:
      return "#829356";
    case AnswerNode.nodeName:
      return "#107896";
    case SubAnswerNode.nodeName:
      return "#093145";
    default:
      return "#ccc";
  }
};

const App = () => {
  const { goBack } = useHistory();
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();
  const nodeTypes: NodeTypes = useMemo(
    () => ({
      [RootQuestionNode.nodeName]: RootQuestionNode,
      [QuestionNode.nodeName]: QuestionNode,
      [AnswerNode.nodeName]: AnswerNode,
      [SubAnswerNode.nodeName]: SubAnswerNode,
    }),
    [],
  );

  const onSave = useCallback(() => {
    console.log(rfInstance?.toObject());
  }, [rfInstance]);

  return (
    <Box className="MDA-ROOT" height="100vh">
      <Box background="neutral100">
        <HeaderLayout
          title="Parcours de diagnostic V2"
          navigationAction={
            <Link
              startIcon={<ArrowLeft />}
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                goBack();
              }}
              to="/"
            >
              Retour
            </Link>
          }
          primaryAction={
            <Button disabled={false} loading={false} onClick={onSave}>
              Sauvegarder
            </Button>
          }
        />
      </Box>
      <ContentLayout>
        <Box borderColor="neutral1000" padding="4px" hasRadius height="calc(100vh - 140px)">
          <ReactFlow
            defaultNodes={initialNodes}
            defaultEdges={initialEdges}
            style={{ backgroundColor: "#fff" }}
            proOptions={{ hideAttribution: true }}
            fitView
            onNodesDelete={nodes => console.log("NODES DELETE", nodes)}
            nodeTypes={nodeTypes}
            snapToGrid
            snapGrid={[50, 50]}
            onInit={setRfInstance}
          >
            <Background id="1" gap={10} color="#f1f1f1" variant={BackgroundVariant.Lines} />
            <Background id="2" gap={100} offset={1} color="#ccc" variant={BackgroundVariant.Lines} />
            <Controls />
            <MiniMap position="top-right" nodeColor={nodeColor} zoomable pannable />
          </ReactFlow>
        </Box>
      </ContentLayout>
    </Box>
  );
};

export default App;

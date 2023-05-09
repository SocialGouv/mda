import "reactflow/dist/style.css";
import "./MdaDiagnostic.css";

import { Loader } from "@strapi/design-system";
import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { ContentLayout, HeaderLayout } from "@strapi/design-system/Layout";
import { Link } from "@strapi/design-system/Link";
import { ArrowLeft } from "@strapi/icons";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ControlButton,
  Controls,
  MiniMap,
  type Node,
  type NodeTypes,
} from "reactflow";

import { useAlert } from "../hooks/useAlert";
import { useDiagnosticTree } from "../hooks/useDiagnosticTree";
import { AnswerNode } from "./mindmap/AnswerNode";
import { QuestionNode } from "./mindmap/QuestionNode";
import { RootQuestionNode } from "./mindmap/RootQuestionNode";
import { SubAnswerNode } from "./mindmap/SubAnswerNode";

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

export const MdaDiagnostic = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { goBack } = useHistory();
  const { handleNotification } = useAlert();
  const {
    edges,
    nodes,
    fetchDiagnosticTree,
    onConnectHandler,
    onEdgesChange,
    onAddNode,
    onNodesChange,
    updateDiagnosticTreeHandler,
  } = useDiagnosticTree();

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      [RootQuestionNode.nodeName]: RootQuestionNode,
      [QuestionNode.nodeName]: QuestionNode,
      [AnswerNode.nodeName]: AnswerNode,
      [SubAnswerNode.nodeName]: SubAnswerNode,
    }),
    [],
  );

  const onConnect = onConnectHandler(handleNotification);
  const updateDiagnosticTree = updateDiagnosticTreeHandler(handleNotification);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchDiagnosticTree();
  }, [fetchDiagnosticTree]);

  const onSave = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateDiagnosticTree();
  }, [updateDiagnosticTree]);

  return (
    <Box className="MDA-ROOT" height="100vh">
      <Box background="neutral100">
        <HeaderLayout
          title="Parcours de diagnostic"
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
            <Button disabled={!nodes.length} loading={!nodes.length} onClick={onSave}>
              Sauvegarder
            </Button>
          }
        />
      </Box>
      <ContentLayout>
        {nodes.length ? (
          <Box borderColor="neutral1000" padding="4px" hasRadius height="calc(100vh - 140px)">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              style={{ backgroundColor: "#fff" }}
              proOptions={{ hideAttribution: true }}
              fitView
              onConnect={onConnect}
              onEdgesChange={onEdgesChange}
              onNodesChange={onNodesChange}
              nodeTypes={nodeTypes}
            >
              <Background id="1" gap={10} color="#f1f1f1" variant={BackgroundVariant.Lines} />
              <Background id="2" gap={100} offset={1} color="#ccc" variant={BackgroundVariant.Lines} />
              <Controls>
                <ControlButton
                  className="mda-control mda-control--question"
                  onClick={() => onAddNode(QuestionNode.nodeName)}
                  title="Ajouter une question"
                >
                  <div>Q</div>
                </ControlButton>
                <ControlButton
                  className="mda-control mda-control--answer"
                  onClick={() => onAddNode(AnswerNode.nodeName)}
                  title="Ajouter une réponse"
                >
                  <div>R</div>
                </ControlButton>
                <ControlButton
                  className="mda-control mda-control--subanswer"
                  onClick={() => onAddNode(SubAnswerNode.nodeName)}
                  title="Ajouter une sous réponse"
                >
                  <div>S</div>
                </ControlButton>
              </Controls>
              <MiniMap position="top-right" nodeColor={nodeColor} zoomable pannable />
            </ReactFlow>
          </Box>
        ) : (
          <Loader />
        )}
      </ContentLayout>
    </Box>
  );
};

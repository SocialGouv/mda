import "./QuestionNode.css";

import { type DiagnosticQuestionNodeData } from "@mda/strapi-types";

import { NodeContent } from "./NodeContent";
import { type MindmapNode } from "./types";

export const QuestionNode: MindmapNode<DiagnosticQuestionNodeData> = ({ data, selected, id }) => {
  return <NodeContent data={data} id={id} selected={selected} />;
};

QuestionNode.nodeName = "mda-question";

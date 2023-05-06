import "./AnswerNode.css";

import { type DiagnosticAnswerNodeData } from "@mda/strapi-types";

import { NodeContent } from "./NodeContent";
import { type MindmapNode } from "./types";

export const AnswerNode: MindmapNode<DiagnosticAnswerNodeData> = ({ data, id, selected }) => {
  return <NodeContent answer data={data} id={id} selected={selected} />;
};

AnswerNode.nodeName = "mda-answer";

import "./RootQuestionNode.css";

import { type DiagnosticRootNodeData } from "@mda/strapi-types";

import { NodeContent } from "./NodeContent";
import { type MindmapNode } from "./types";

export const RootQuestionNode: MindmapNode<DiagnosticRootNodeData> = ({ data, id, selected }) => {
  return <NodeContent root data={data} id={id} selected={selected} />;
};

RootQuestionNode.nodeName = "mda-root-question";

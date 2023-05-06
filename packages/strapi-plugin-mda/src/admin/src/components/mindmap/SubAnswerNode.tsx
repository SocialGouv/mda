import "./SubAnswerNode.css";

import { type DiagnosticSubanswerNodeData } from "@mda/strapi-types";

import { NodeContent } from "./NodeContent";
import { type MindmapNode } from "./types";

export const SubAnswerNode: MindmapNode<DiagnosticSubanswerNodeData> = ({ data, id, selected }) => {
  return <NodeContent answer data={data} id={id} selected={selected} />;
};

SubAnswerNode.nodeName = "mda-subanswer";

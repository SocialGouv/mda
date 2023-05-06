import "./AnswerNode.css";

import { NodeContent } from "./NodeContent";
import { type AnswerNodeData, type MindmapNode } from "./types";

export const AnswerNode: MindmapNode<AnswerNodeData> = ({ data, id, selected }) => {
  return <NodeContent answer data={data} id={id} selected={selected} />;
};

AnswerNode.nodeName = "mda-answer";

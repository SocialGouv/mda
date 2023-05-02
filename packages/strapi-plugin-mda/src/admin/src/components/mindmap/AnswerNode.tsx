import "./AnswerNode.css";

import { NodeContent } from "./NodeContent";
import { type MindmapNode, type NodeData } from "./types";

export const AnswerNode: MindmapNode<NodeData> = ({ data, id, selected }) => {
  return <NodeContent data={data} id={id} selected={selected} />;
};

AnswerNode.nodeName = "mda-answer";

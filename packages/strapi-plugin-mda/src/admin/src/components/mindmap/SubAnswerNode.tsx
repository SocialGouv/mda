import "./SubAnswerNode.css";

import { NodeContent } from "./NodeContent";
import { type AnswerNodeData, type MindmapNode } from "./types";

export const SubAnswerNode: MindmapNode<AnswerNodeData> = ({ data, id, selected }) => {
  return <NodeContent answer data={data} id={id} selected={selected} />;
};

SubAnswerNode.nodeName = "mda-subanswer";

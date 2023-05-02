import "./SubAnswerNode.css";

import { NodeContent } from "./NodeContent";
import { type MindmapNode, type NodeData } from "./types";

export const SubAnswerNode: MindmapNode<NodeData> = ({ data, id, selected }) => {
  return <NodeContent data={data} id={id} selected={selected} />;
};

SubAnswerNode.nodeName = "mda-subanswer";

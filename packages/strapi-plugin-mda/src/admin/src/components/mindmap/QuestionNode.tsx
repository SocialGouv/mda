import "./QuestionNode.css";

import { NodeContent } from "./NodeContent";
import { type MindmapNode, type NodeData } from "./types";

export const QuestionNode: MindmapNode<NodeData> = ({ data, selected, id }) => {
  return <NodeContent data={data} id={id} selected={selected} />;
};

QuestionNode.nodeName = "mda-question";

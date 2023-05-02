import "./RootQuestionNode.css";

import { NodeContent } from "./NodeContent";
import { type MindmapNode, type RootNodeData } from "./types";

export const RootQuestionNode: MindmapNode<RootNodeData> = ({ data, id, selected }) => {
  return <NodeContent root data={data} id={id} selected={selected} />;
};

RootQuestionNode.nodeName = "mda-root-question";

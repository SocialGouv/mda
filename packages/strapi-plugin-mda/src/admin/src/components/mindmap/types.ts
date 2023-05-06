import { type NodeProps } from "reactflow";

export interface RootNodeData {
  content: string;
}

export interface NodeData extends RootNodeData {
  displayInfoUp: boolean;
  info?: string;
}

export interface AnswerNodeData extends NodeData {
  order?: number;
}

export interface MindmapNode<T extends RootNodeData> {
  (props: NodeProps<T>): JSX.Element;
  nodeName: string;
}

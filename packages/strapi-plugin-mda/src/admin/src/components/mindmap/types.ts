import { type DiagnosticNodeData } from "@mda/strapi-types";
import { type NodeProps } from "reactflow";

export interface MindmapNode<T extends DiagnosticNodeData> {
  (props: NodeProps<T>): JSX.Element;
  nodeName: string;
}

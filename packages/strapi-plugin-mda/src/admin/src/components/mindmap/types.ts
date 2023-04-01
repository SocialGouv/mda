import { type Diag } from "@mda/strapi-types";
import { type NodeProps } from "reactflow";

export interface MindmapNode<T extends Diag.Answer | Diag.Question | Diag.SubAnswer> {
  (props: NodeProps<T>): JSX.Element;
  nodeName: string;
}

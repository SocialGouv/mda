import { type Diag } from "@mda/strapi-types";
import React from "react";
import { Handle, type NodeProps, Position } from "reactflow";

export const TextNode = ({ data, id, selected }: NodeProps<Diag.Answer | Diag.Question | Diag.SubAnswer>) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      {/* {selected ? <input id={`node-${id}`} name={`node-${id}`} className="nodrag" /> : data.content} */}
      {data.content}
      <Handle type="source" position={Position.Right} />
    </>
  );
};

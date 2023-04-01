import "./NodeContent.css";

import React from "react";
import { Handle, Position } from "reactflow";

export interface NodeContentProps {
  root?: boolean;
  text: string;
}

export const NodeContent = ({ text, root }: NodeContentProps) => {
  return (
    <>
      {!root && <Handle type="target" position={Position.Left} />}
      {/* {selected ? <input id={`node-${id}`} name={`node-${id}`} className="nodrag" /> : data.content} */}
      <span className={text.length > 100 ? "mda__node-content-xs" : text.length > 50 ? "mda__node-content-s" : ""}>
        {text}
      </span>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

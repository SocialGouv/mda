import "./NodeContent.css";

import React from "react";
import { Handle, Position } from "reactflow";

export interface NodeContentProps {
  id: string;
  root?: boolean;
  selected?: boolean;
  text: string;
}

export const NodeContent = ({ text, root, selected, id }: NodeContentProps) => {
  return (
    <>
      {!root && <Handle type="target" position={Position.Left} />}
      {selected ? (
        <input id={`node-${id}`} name={`node-${id}`} className="nodrag" defaultValue={text} />
      ) : (
        <span className={text.length > 100 ? "mda__node-content-xs" : text.length > 50 ? "mda__node-content-s" : ""}>
          {text}
        </span>
      )}
      <Handle type="source" position={Position.Right} />
    </>
  );
};

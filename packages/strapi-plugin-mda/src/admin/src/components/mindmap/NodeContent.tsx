import "./NodeContent.css";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

export interface NodeContentProps {
  id: string;
  root?: boolean;
  selected?: boolean;
  text: string;
}

export const NodeContent = ({ text, root, selected, id }: NodeContentProps) => {
  const [editedText, setEditedText] = useState(text);

  useEffect(() => {
    setEditedText(text);
  }, [text]);

  return (
    <>
      {!root && <Handle type="target" position={Position.Left} />}
      {/* {selected ? (
        <input id={`node-${id}`} name={`node-${id}`} className="nodrag" defaultValue={text} />
      ) : ( */}
      <span
        contentEditable={selected}
        suppressContentEditableWarning
        className={clsx(
          editedText.length > 100 ? "mda__node-content-xs" : editedText.length > 50 ? "mda__node-content-s" : "",
          selected && "nodrag",
        )}
        onBlur={console.log}
        onInput={e => setEditedText(e.currentTarget.textContent ?? "")}
      >
        {text}
      </span>
      {/* )} */}
      <Handle type="source" position={Position.Right} />
    </>
  );
};

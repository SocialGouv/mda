import "./NodeContent.css";

import {
  type DiagnosticAnswerNodeData,
  type DiagnosticNodeData,
  type DiagnosticQuestionNodeData,
  type DiagnosticRootNodeData,
  type DiagnosticSubanswerNodeData,
} from "@mda/strapi-types";
import { IconButton, ModalBody, ModalHeader, ModalLayout, Tooltip, Typography } from "@strapi/design-system";
import { Pencil } from "@strapi/icons";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

import { useDiagnosticTree } from "../../hooks/useDiagnosticTree";
import { NodeForm } from "./NodeForm";

export type NodeContentProps =
  | {
      answer: true;
      data: DiagnosticAnswerNodeData;
      id: string;
      root?: false;
      selected?: boolean;
    }
  | {
      answer: true;
      data: DiagnosticSubanswerNodeData;
      id: string;
      root?: false;
      selected?: boolean;
    }
  | {
      answer?: false;
      data: DiagnosticQuestionNodeData;
      id: string;
      root?: false;
      selected?: boolean;
    }
  | {
      answer?: false;
      data: DiagnosticRootNodeData;
      id: string;
      root: true;
      selected?: boolean;
    };

export const NodeContent = (props: NodeContentProps) => {
  const { answer, data, id, root } = props;
  const { onNodeChange } = useDiagnosticTree();
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = useCallback(
    (newData: DiagnosticNodeData) => {
      onNodeChange(id, newData);
      setIsVisible(false);
    },
    [id, onNodeChange],
  );

  return (
    <>
      {!root && <Handle type="target" position={Position.Left} />}
      {!root && !!data.info && (
        <Tooltip position={data.displayInfoUp ? "top" : "bottom"} description={data.info}>
          <Typography
            className={clsx(
              data.content.length > 100
                ? "mda__node-content-xs"
                : data.content.length > 50
                ? "mda__node-content-s"
                : "",
            )}
          >
            {data.content}
          </Typography>
        </Tooltip>
      )}

      {(!!root || !data.info) && (
        <Typography
          className={clsx(
            data.content.length > 100 ? "mda__node-content-xs" : data.content.length > 50 ? "mda__node-content-s" : "",
          )}
        >
          {data.content}
        </Typography>
      )}

      {answer && <span className="mda__node-content__order">{data.order}</span>}

      <IconButton onClick={() => setIsVisible(prev => !prev)} icon={<Pencil />} />
      {isVisible && (
        <ModalLayout onClose={() => setIsVisible(prev => !prev)} labelledBy="title">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
              Éditer
            </Typography>
          </ModalHeader>
          <ModalBody>
            <NodeForm form={props} onSubmit={onSubmit}></NodeForm>
          </ModalBody>
        </ModalLayout>
      )}
      <Handle type="source" position={Position.Right} />
    </>
  );
};

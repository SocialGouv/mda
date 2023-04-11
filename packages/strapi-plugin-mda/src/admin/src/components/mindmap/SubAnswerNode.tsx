import "./SubAnswerNode.css";

import { type Diag } from "@mda/strapi-types";
import React from "react";

import { NodeContent } from "./NodeContent";
import { type MindmapNode } from "./types";

export const SubAnswerNode: MindmapNode<Diag.SubAnswer> = ({ data, id, selected }) => {
  return <NodeContent text={data.content} id={id} selected={selected} />;
};

SubAnswerNode.nodeName = "mda-subanswer";

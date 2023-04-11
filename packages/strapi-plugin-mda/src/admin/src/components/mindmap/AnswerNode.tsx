import "./AnswerNode.css";

import { type Diag } from "@mda/strapi-types";
import React from "react";

import { NodeContent } from "./NodeContent";
import { type MindmapNode } from "./types";

export const AnswerNode: MindmapNode<Diag.Answer> = ({ data, id, selected }) => {
  return <NodeContent text={data.content} id={id} selected={selected} />;
};

AnswerNode.nodeName = "mda-answer";

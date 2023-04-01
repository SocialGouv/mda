import "./AnswerNode.css";

import { type Diag } from "@mda/strapi-types";
import React from "react";

import { NodeContent } from "./NodeContent";
import { type MindmapNode } from "./types";

export const AnswerNode: MindmapNode<Diag.Answer> = ({ data }) => {
  return <NodeContent text={data.content} />;
};

AnswerNode.nodeName = "mda-answer";

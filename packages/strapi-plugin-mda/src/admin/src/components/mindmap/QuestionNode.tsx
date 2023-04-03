import "./QuestionNode.css";

import { type Diag } from "@mda/strapi-types";
import React from "react";

import { NodeContent } from "./NodeContent";
import { type MindmapNode } from "./types";

export const QuestionNode: MindmapNode<Diag.Question> = ({ data, selected, id }) => {
  return <NodeContent text={data.content} id={id} selected={selected} />;
};

QuestionNode.nodeName = "mda-question";

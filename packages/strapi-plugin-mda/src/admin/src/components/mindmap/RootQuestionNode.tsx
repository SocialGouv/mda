import "./RootQuestionNode.css";

import { type Diag } from "@mda/strapi-types";
import React from "react";

import { NodeContent } from "./NodeContent";
import { type MindmapNode } from "./types";

export const RootQuestionNode: MindmapNode<Diag.Question> = ({ data, id, selected }) => {
  return <NodeContent root text={data.content} id={id} selected={selected} />;
};

RootQuestionNode.nodeName = "mda-root-question";

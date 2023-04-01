import "./RootQuestionNode.css";

import { type Diag } from "@mda/strapi-types";
import React from "react";

import { NodeContent } from "./NodeContent";
import { type MindmapNode } from "./types";

export const RootQuestionNode: MindmapNode<Diag.Question> = ({ data }) => {
  return <NodeContent root text={data.content} />;
};

RootQuestionNode.nodeName = "mda-root-question";

/**
 * diagnostic service
 */

import {
  type DbEntry,
  type DiagnosticAnswerNodeData,
  type DiagnosticAnswerNodeType,
  type DiagnosticQuestionNodeData,
  type DiagnosticQuestionNodeType,
  type DiagnosticRootNodeData,
  type DiagnosticRootNodeType,
  type DiagnosticSubanswerNodeData,
  type DiagnosticSubAnswerNodeType,
} from "@mda/strapi-types";
import { factories } from "@strapi/strapi";
import { type Context } from "koa";
import { type Edge, type Node, type ReactFlowJsonObject } from "reactflow";

import { ctxParams } from "../../../utils/ctxParamsHelper";

type ReactFlowFullJsonObject<Nodes> = Omit<ReactFlowJsonObject, "nodes"> & {
  nodes: Nodes[];
};

type DiagnosticRootNode = Node<DiagnosticRootNodeData, DiagnosticRootNodeType>;
type DiagnosticQuestionNode = Node<DiagnosticQuestionNodeData, DiagnosticQuestionNodeType>;
type DiagnosticAnswerNode = Node<DiagnosticAnswerNodeData, DiagnosticAnswerNodeType>;
type DiagnosticSubanswerNode = Node<DiagnosticSubanswerNodeData, DiagnosticSubAnswerNodeType>;
type DiagnosticNode = DiagnosticAnswerNode | DiagnosticQuestionNode | DiagnosticRootNode | DiagnosticSubanswerNode;

type Answer = DiagnosticAnswerNodeData & {
  id: string;
} & (
    | {
        destination: {
          data: {
            id: string;
          };
        };
      }
    | {
        subanswers?: SubAnswer[];
      }
  );
type SubAnswer = DiagnosticSubanswerNodeData & {
  destination: {
    data: {
      id: string;
    };
  };
  id: string;
};

class DiagnosticTreeError extends Error {}

const isDiagnosticTree = (tree: unknown): tree is ReactFlowFullJsonObject<DiagnosticNode> => !!tree;

const formatAnswers = ({
  nodeEdges,
  tree,
  type,
}: {
  nodeEdges: Edge[];
  tree: ReactFlowFullJsonObject<DiagnosticNode>;
  type: DiagnosticAnswerNodeType | DiagnosticSubAnswerNodeType;
}) => {
  const { nodes, edges } = tree;
  return nodeEdges
    .map((edge): Answer | SubAnswer => {
      const answer = nodes.find(node => node.id === edge.target);
      if (!answer || answer.type !== type) {
        throw new DiagnosticTreeError(
          `Invalid Diagnostic tree for relation ${edge.source} to ${edge.target} type ${type}. Please fix it in the back office !`,
        );
      }

      const { id: answerId, data: answerData } = answer;

      const answerEdges = edges.filter(answerEdge => answerEdge.source === answerId);

      if (answerEdges.length === 1) {
        const [{ target: answerTarget }] = answerEdges;
        if (answerTarget.startsWith("question")) {
          return {
            id: answerId,
            ...answerData,
            destination: {
              data: {
                id: answerTarget,
              },
            },
          };
        }
      }

      if (type === "mda-answer") {
        return {
          id: answerId,
          ...answerData,
          subanswers: formatAnswers({ nodeEdges: answerEdges, tree, type: "mda-subanswer" }),
        } as Answer;
      }

      throw new DiagnosticTreeError(
        `Invalid Diagnostic tree got a ${answerId} with more than one question. Please fix it in the back office !`,
      );
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

const formatQuestion = ({ id, tree }: { id: string | null; tree: ReactFlowFullJsonObject<DiagnosticNode> }) => {
  const { edges, nodes } = tree;
  const node = id ? nodes.find(n => n.id === id) : nodes.find(n => n.type === "mda-root-question");

  if (!node) {
    return;
  }

  const { id: nodeId, data: nodeData } = node;

  const nodeEdges = edges.filter(edge => edge.source === nodeId);

  return {
    data: {
      id: nodeId,
      attributes: {
        ...nodeData,
        answers: formatAnswers({ nodeEdges, tree, type: "mda-answer" }),
      },
    },
  };
};

export default factories.createCoreService("api::diagnostic.diagnostic", ({ strapi }) => {
  const { entityService } = strapi;

  return {
    async question(ctx: Context) {
      const id = ctxParams(ctx).get("id");
      const diagnosticTree: DbEntry<"plugin::mda.diagnostic-tree"> = await entityService.findMany(
        "plugin::mda.diagnostic-tree",
      );

      if (!diagnosticTree || !isDiagnosticTree(diagnosticTree.tree)) {
        return;
      }

      const { tree } = diagnosticTree;

      try {
        return formatQuestion({
          id,
          tree,
        });
      } catch (e) {
        if (e instanceof DiagnosticTreeError) {
          ctx.status = 409;
          ctx.body = {
            message: e.message,
          };
          return;
        }
        strapi.log.error(e);
        throw e;
      }
    },
  };
});

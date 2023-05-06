import { type DiagnosticNodeData } from "@mda/strapi-types";
import { request } from "@strapi/helper-plugin";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  type ReactFlowJsonObject,
  type Viewport,
} from "reactflow";
import { create } from "zustand";

import { AnswerNode } from "../components/mindmap/AnswerNode";
import { QuestionNode } from "../components/mindmap/QuestionNode";
import { RootQuestionNode } from "../components/mindmap/RootQuestionNode";
import { SubAnswerNode } from "../components/mindmap/SubAnswerNode";
import pluginId from "../pluginId";
import { type useAlert } from "./useAlert";

type HandleNotification = ReturnType<typeof useAlert>["handleNotification"];

const idPrefixes = {
  [QuestionNode.nodeName]: "question-",
  [AnswerNode.nodeName]: "answer-",
  [SubAnswerNode.nodeName]: "subanswer-",
} as const;

const nodeData = {
  [QuestionNode.nodeName]: {
    content: "Question",
    displayInfoUp: false,
    info: "",
  },
  [AnswerNode.nodeName]: {
    content: "Réponse",
    displayInfoUp: false,
    info: "",
  },
  [SubAnswerNode.nodeName]: {
    content: "Sous réponse",
    displayInfoUp: false,
    info: "",
  },
} as const;

const forbiddenConnections: Record<string, Array<{ message: string; target: string }>> = {
  answer: [
    {
      target: "answer",
      message: "Vous ne pouvez relier une réponse à une autre réponse",
    },
  ],
  question: [
    {
      target: "question",
      message: "Vous ne pouvez relier une question à une autre question",
    },
    {
      target: "subanswer",
      message: "Vous ne pouvez relier une question à une sous réponse",
    },
  ],
  subanswer: [
    {
      target: "answer",
      message: "Vous ne pouvez relier une sous réponse à une réponse",
    },
    {
      target: "subanswer",
      message: "Vous ne pouvez relier une sous réponse à une autre sous réponse",
    },
  ],
};

const prefixesReg = new RegExp(Object.values(idPrefixes).join("|"));

type RFState = {
  edges: Edge[];
  fetchDiagnosticTree: (this: void) => Promise<void>;
  nodes: Node[];
  onAddNode: (this: void, type: keyof typeof idPrefixes) => void;
  onConnectHandler: (this: void, handleNotification: HandleNotification) => OnConnect;
  onEdgesChange: OnEdgesChange;
  onNodeChange: (this: void, id: string, data: DiagnosticNodeData) => void;
  onNodesChange: OnNodesChange;
  updateDiagnosticTreeHandler: (this: void, handleNotification: HandleNotification) => () => Promise<void>;
  viewPort: Viewport;
};

export const useDiagnosticTree = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  viewPort: {
    x: 0,
    y: 0,
    zoom: 1,
  },
  fetchDiagnosticTree: async () => {
    let val: Partial<ReactFlowJsonObject>;
    try {
      const response = await request(`/${pluginId}/diagnostic-tree`, {
        method: "GET",
      });

      val = response.data.attributes.tree;
    } catch (e) {
      console.warn(e);
      val = {
        nodes: [
          {
            id: "question-1",
            data: {
              content: "Je suis",
            },
            position: { x: 0, y: 0 },
            type: RootQuestionNode.nodeName,
            deletable: false,
          },
        ],
        edges: [],
      };
    }
    set(val);
  },
  updateDiagnosticTreeHandler: handleNotification => {
    return async () => {
      try {
        const { edges, nodes, viewPort } = get();
        await request(`/${pluginId}/diagnostic-tree`, {
          method: "PUT",
          body: {
            data: {
              tree: { edges, nodes, viewPort },
            },
          },
        });

        handleNotification({
          type: "success",
          message: "Diagnostics tree sucessfully updated!",
          blockTransition: false,
        });
      } catch (e: any) {
        handleNotification({
          type: "warning",
          message: e.message,
          link: e.link,
        });
      }
    };
  },
  onAddNode: type => {
    const { nodes } = get();
    const idPrefix = idPrefixes[type];
    const currentX = Math.max(...[...nodes.map(node => node.position.x), 0]);
    const currentY = Math.max(...[...nodes.map(node => node.position.y), 0]);
    const currentId = Math.max(
      ...[...nodes.filter(node => node.id.startsWith(idPrefix)).map(node => +node.id.replace(prefixesReg, "")), 1],
    );

    set({
      nodes: [
        ...nodes,
        {
          id: `${idPrefix}${currentId + 1}`,
          data: {
            ...nodeData[type],
          },
          type: type as string,
          position: {
            x: currentX + 50,
            y: currentY + 50,
          },
          deletable: true,
        },
      ],
    });
  },
  onNodeChange: (id, data) => {
    set({
      nodes: get().nodes.map(node => {
        if (node.id === id) {
          node.data = {
            ...data,
          };
          node.selected = false;
        }
        return {
          ...node,
        };
      }),
    });
  },
  onNodesChange: changes => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: changes => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnectHandler: handleNotification => connection => {
    const { source: connectionSource, target: connectionTarget } = connection;

    const source = connectionSource?.split("-").shift();
    if (source && forbiddenConnections[source]) {
      const forbiddenConnection = forbiddenConnections[source].find(({ target }) =>
        connectionTarget?.startsWith(target),
      );

      if (forbiddenConnection) {
        return handleNotification({
          type: "warning",
          message: forbiddenConnection.message,
          blockTransition: false,
        });
      }
    }

    const edges = get().edges;
    if (connectionSource && source === "answer") {
      const previousEdges = edges.filter(({ id }) => id.includes(`-${connectionSource}-`));
      if (previousEdges.length) {
        if (connectionTarget?.startsWith("question")) {
          if (previousEdges.some(({ target }) => target.startsWith("question"))) {
            return handleNotification({
              type: "warning",
              message: "Vous ne pouvez pas relier une réponse à plusieurs questions",
              blockTransition: false,
            });
          }

          if (previousEdges.some(({ target }) => target.startsWith("subanswer"))) {
            return handleNotification({
              type: "warning",
              message: "Vous ne pouvez pas relier une réponse à des sous réponses et une autre question",
              blockTransition: false,
            });
          }
        }

        if (connectionTarget?.startsWith("subanswer")) {
          if (!previousEdges.every(({ target }) => target.startsWith("subanswer"))) {
            return handleNotification({
              type: "warning",
              message: "Vous ne pouvez pas relier une réponse à une question et des sous réponses",
              blockTransition: false,
            });
          }
        }
      }
    }

    set({
      edges: addEdge(connection, edges),
    });
  },
}));

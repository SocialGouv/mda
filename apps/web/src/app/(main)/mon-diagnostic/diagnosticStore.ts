import { type Response } from "@mda/strapi-types";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Question = NonNullable<Response<"api::diagnostic.question">["data"]>;

interface DiagnosticStore {
  addQuestion: (question: Question, index?: number) => void;
  questionList: Question[];
}

export const useDiagnosticStore = create<DiagnosticStore>()(
  //   persist(
  devtools((set, get) => ({
    addQuestion(question, idx = get().questionList.length) {
      const questionList = [...get().questionList.slice(0, idx), question];
      set({
        questionList,
      });
    },
    questionList: [],
  })),
  //     {
  //       name: "diagnostic",
  //     },
  //   ),
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("useDiagnosticStore", useDiagnosticStore);
}

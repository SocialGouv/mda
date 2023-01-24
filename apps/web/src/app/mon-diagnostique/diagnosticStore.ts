import { type Response } from "@services/strapiApiTypes";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Question = NonNullable<Response<"api::question.question">["data"]>;

interface DiagnosticStore {
  addQuestion: (question: Question) => void;
  currentIndex: number;
  questionList: Question[];
}

export const useDiagnosticStore = create<DiagnosticStore>()(
  //   persist(
  devtools((set, get) => ({
    addQuestion(question) {
      const questionList = [...get().questionList, question];
      set({
        questionList,
        currentIndex: questionList.length - 1,
      });
    },
    currentIndex: -1,
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

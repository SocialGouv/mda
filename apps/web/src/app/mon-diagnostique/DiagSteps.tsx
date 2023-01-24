"use client";

import { useEffectOnce } from "@components/hooks/useEffectOnce";
import {
  type FormSelectProps,
  FormGroup,
  FormGroupLabel,
  FormGroupStep,
  FormGroupSteps,
  FormSelect,
  Notice,
} from "@design-system";
import { fetchStrapi } from "@services/strapi";
import { type Response } from "@services/strapiApiTypes";
import { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";

import { useDiagnosticStore } from "./diagnosticStore";

type Question = NonNullable<Response<"api::question.question">["data"]>;

export interface DiagStepsProps {
  firstQuestion: Question;
}
export const DiagSteps = ({ firstQuestion }: DiagStepsProps) => {
  const { questionList, addQuestion } = useDiagnosticStore(useCallback(state => state, []));

  useEffectOnce(() => {
    console.log("HA !", firstQuestion);
    addQuestion(firstQuestion);
  });
  return (
    <FormGroupSteps>
      {questionList.map((question, idx) => (
        <QuestionBox key={`question-${idx}`} id={`question-${idx}`} question={question} />
      ))}
    </FormGroupSteps>
  );
};

export interface QuestionBoxProps {
  id: string;
  question: Question;
}

const QuestionBox = ({ question, id }: QuestionBoxProps) => {
  const { addQuestion } = useDiagnosticStore();
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(-1);

  const handleAnswerChange: FormSelectProps["onChange"] = event => {
    const answerIndex = +event.currentTarget.value;
    setCurrentAnswerIndex(answerIndex);

    const answer = question.attributes.answers?.[answerIndex];
    if (!answer) return;

    console.log("Selected anwser", answer);
    if (answer.destination?.data) {
      void fetchStrapi(`questions/${answer.destination.data.id}`, { populate: "deep,4" }).then(destination => {
        console.log("Go to destination", destination);
        if (destination.data) addQuestion(destination.data);
      });
    }
  };

  const handleSubAnswerChange: FormSelectProps["onChange"] = event => {
    const subAnswer = question.attributes.answers?.[currentAnswerIndex].subanswers?.[+event.currentTarget.value];
    if (!subAnswer) return;

    console.log("Selected subanwser", subAnswer);
    if (subAnswer.destination?.data) {
      void fetchStrapi(`questions/${subAnswer.destination.data.id}`).then(destination => {
        console.log("Go to destination from subanswer", destination);
        if (destination.data) addQuestion(destination.data);
      });
    }
  };

  return (
    <FormGroupStep>
      <FormGroup>
        <FormGroupLabel htmlFor={`select-question-${id}`}>{question.attributes.content}</FormGroupLabel>
        {question.attributes.answers?.length && (
          <FormSelect
            id={`select-question-${id}`}
            onChange={handleAnswerChange}
            placeholder="Veuillez sélectionner une réponse"
            placeholderSelected={true}
          >
            {question.attributes.answers.map((answer, answerIdx) => (
              <option key={`${question.id}-answer-${answerIdx}`} value={answerIdx}>
                {answer.content}
              </option>
            ))}
          </FormSelect>
        )}
      </FormGroup>
      {question.attributes.answers?.[currentAnswerIndex]?.subanswers?.length ? (
        <FormGroup>
          <FormSelect
            id={`select-question-subanswer-${id}`}
            onChange={handleSubAnswerChange}
            placeholder="Veuillez sélectionner une réponse"
            placeholderSelected={true}
          >
            {question.attributes.answers[currentAnswerIndex].subanswers?.map((subAnswer, subAnswerIdx) => (
              <option key={`${question.id}-subanswer-${subAnswerIdx}`} value={subAnswerIdx}>
                {subAnswer.content}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
      ) : null}
      {question.attributes.info && (
        <Notice isInsideContent>
          <ReactMarkdown>{question.attributes.info}</ReactMarkdown>
        </Notice>
      )}
      {question.attributes.answers?.[currentAnswerIndex]?.info && (
        <Notice isInsideContent>
          <ReactMarkdown>{question.attributes.answers?.[currentAnswerIndex]?.info ?? ""}</ReactMarkdown>
        </Notice>
      )}
    </FormGroupStep>
  );
};

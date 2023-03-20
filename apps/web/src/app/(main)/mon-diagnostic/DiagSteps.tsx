"use client";

import { useEffectOnce } from "@components/hooks/useEffectOnce";
import { Markdown } from "@components/utils/Markdown";
import {
  FormGroup,
  FormGroupLabel,
  FormGroupStep,
  FormGroupSteps,
  FormSelect,
  type FormSelectProps,
  Notice,
} from "@design-system";
import { type Response } from "@mda/strapi-types";
import { fetchStrapi } from "@services/strapi";
import { push } from "@socialgouv/matomo-next";
import { useCallback, useState } from "react";

import { useDiagnosticStore } from "./diagnosticStore";

type Question = NonNullable<Response<"api::question.question">["data"]>;

export interface DiagStepsProps {
  firstQuestion: Question;
}
export const DiagSteps = ({ firstQuestion }: DiagStepsProps) => {
  const { questionList, addQuestion } = useDiagnosticStore(useCallback(state => state, []));

  useEffectOnce(() => {
    addQuestion(firstQuestion);
  });
  return (
    <FormGroupSteps>
      {questionList.map((question, idx) => (
        <QuestionBox key={`question-${question.id}`} index={idx} question={question} />
      ))}
    </FormGroupSteps>
  );
};

export interface QuestionBoxProps {
  index: number;
  question: Question;
}

const QuestionBox = ({ question, index }: QuestionBoxProps) => {
  const { addQuestion } = useDiagnosticStore(useCallback(state => state, []));
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(-1);
  const [currentSubanswerIndex, setCurrentSubanswerIndex] = useState(-1);

  const handleAnswerChange: FormSelectProps["onChange"] = event => {
    const answerIndex = +event.currentTarget.value;
    setCurrentSubanswerIndex(-1);
    setCurrentAnswerIndex(answerIndex);

    const answer = question.attributes.answers?.[answerIndex];
    if (!answer) return;

    console.log("Selected anwser", answer);
    if (answer.destination?.data) {
      // if destination question, fetch and append to list
      void fetchStrapi(`questions/${answer.destination.data.id}`, { populate: "deep,4" }).then(destination => {
        console.log("Go to destination", destination);
        if (destination.data) addQuestion(destination.data, index + 1);
      });

      if (index === 2) {
        push(["trackEvent", "Diagnostic", "Three Steps Passed"]);
      }
    } else {
      // else reset the question at the same index in the list
      addQuestion(question, index);
    }
  };

  const handleSubAnswerChange: FormSelectProps["onChange"] = event => {
    const subanswerIndex = +event.currentTarget.value;
    setCurrentSubanswerIndex(subanswerIndex);
    const subAnswer = question.attributes.answers?.[currentAnswerIndex].subanswers?.[subanswerIndex];
    if (!subAnswer) return;

    console.log("Selected subanwser", subAnswer);
    if (subAnswer.destination?.data) {
      void fetchStrapi(`questions/${subAnswer.destination.data.id}`, { populate: "deep,3" }).then(destination => {
        console.log("Go to destination from subanswer", destination);
        if (destination.data) addQuestion(destination.data, index + 1);
      });
    }
  };

  return (
    <FormGroupStep>
      {question.attributes.info && (
        <Notice className="fr-my-1w" isInsideContent>
          <Markdown>{question.attributes.info}</Markdown>
        </Notice>
      )}
      {question.attributes.answers?.length ? (
        <fieldset className="fr-fieldset-reset">
          <legend className="fr-sr-only">{question.attributes.content}</legend>
          <FormGroup>
            <FormGroupLabel htmlFor={`select-question-${index}`}>{question.attributes.content}</FormGroupLabel>
            <FormSelect
              id={`select-question-${index}`}
              onChange={handleAnswerChange}
              placeholder="Veuillez sélectionner une réponse"
              placeholderSelected={true}
              placeholderHidden={false}
            >
              {question.attributes.answers.map((answer, answerIdx) => (
                <option key={`${question.id}-answer-${answerIdx}`} value={answerIdx}>
                  {answer.content}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
          {question.attributes.answers?.[currentAnswerIndex]?.subanswers?.length ? (
            <FormGroup>
              <FormGroupLabel htmlFor={`select-question-subanswer-${index}`} className="fr-sr-only">
                {question.attributes.content} {question.attributes.answers?.[currentAnswerIndex].content.toLowerCase()}
              </FormGroupLabel>
              <FormSelect
                id={`select-question-subanswer-${index}`}
                onChange={handleSubAnswerChange}
                placeholder="Veuillez sélectionner une réponse"
                placeholderSelected={true}
                placeholderHidden={false}
              >
                {question.attributes.answers[currentAnswerIndex].subanswers?.map((subAnswer, subAnswerIdx) => (
                  <option key={`${question.id}-${currentAnswerIndex}-subanswer-${subAnswerIdx}`} value={subAnswerIdx}>
                    {subAnswer.content}
                  </option>
                ))}
              </FormSelect>
              {question.attributes.answers?.[currentAnswerIndex]?.subanswers?.[currentSubanswerIndex]?.info && (
                <Notice className="fr-my-1w" isInsideContent>
                  <Markdown>
                    {question.attributes.answers?.[currentAnswerIndex]?.subanswers?.[currentSubanswerIndex]?.info ?? ""}
                  </Markdown>
                </Notice>
              )}
            </FormGroup>
          ) : null}
        </fieldset>
      ) : (
        <p>{question.attributes.content}</p>
      )}
      {question.attributes.answers?.[currentAnswerIndex]?.info && (
        <Notice className="fr-my-1w" isInsideContent>
          <Markdown>{question.attributes.answers?.[currentAnswerIndex]?.info ?? ""}</Markdown>
        </Notice>
      )}
    </FormGroupStep>
  );
};

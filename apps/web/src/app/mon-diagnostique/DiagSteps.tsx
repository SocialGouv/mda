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
import { type StrapiData } from "@services/strapi";
import { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";

import { useDiagnosticStore } from "./diagnosticStore";

type Question = StrapiData<"api::question.question">;

export interface DiagStepsProps {
  firstQuestion: Question;
}
export const DiagSteps = ({ firstQuestion }: DiagStepsProps) => {
  const { questionList, addQuestion } = useDiagnosticStore(useCallback(state => state, []));

  useEffectOnce(() => {
    console.log("HA !");
    addQuestion(firstQuestion);
  });
  return (
    <FormGroupSteps>
      {/* <FormGroupStep>
        <FormGroup>
          <FormGroupLabel htmlFor="first-question">{firstQuestion.attributes.content}</FormGroupLabel>
          {firstQuestion.attributes.answers?.length && (
            <FormSelect id="first-question">
              {firstQuestion.attributes.answers.map((answer, answerIdx) => (
                <option key={`${firstQuestion.id}-answer-${answerIdx}`} value={answer.content}>
                  {answer.content}
                </option>
              ))}
            </FormSelect>
          )}
        </FormGroup>
      </FormGroupStep> */}
      {questionList.map((question, idx) => (
        <QuestionBox key={`question-${idx}`} id={`question-${idx}`} question={question} />
      ))}
      {/* <FormGroupStep>
        <FormGroup>
          <FormGroupLabel htmlFor="yyy">
            Le rendez-vous avec un médecin traitant / pédiatre / médecin de la crèche ou le médecin de la protection
            maternelle a-t’il été réalisé ?
          </FormGroupLabel>
          <FormSelect id="yyy">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
          </FormSelect>
        </FormGroup>
        <Notice isInsideContent>
          <p>
            La première étape pour initier un diagnostic est de prendre rendez-vous avec votre médecin traitant, le
            pédiatre de votre enfant, ou bien le médecin de la crèche ou de la protection maternelle infantile (PMI).
          </p>
        </Notice>
      </FormGroupStep> */}
    </FormGroupSteps>
  );
};

export interface QuestionBoxProps {
  id: string;
  question: Question;
}

type SubAnswer = NonNullable<NonNullable<Question["attributes"]["answers"]>[number]["subanswers"]>[0];
const QuestionBox = ({ question, id }: QuestionBoxProps) => {
  const { addQuestion } = useDiagnosticStore();
  const [answerInfo, setAnwserInfo] = useState("");
  const [subAnswers, setSubanswers] = useState<SubAnswer[] | null>(null);
  const handleAnswerChange: FormSelectProps["onChange"] = event => {
    const selectedAnwserValue = event.currentTarget.value;

    const answer = question.attributes.answers?.find(answer => answer.content === selectedAnwserValue);
    if (!answer) return;

    if (answer.subanswers) {
      setSubanswers(answer.subanswers);
    } else if (answer.destination) {
      // fetch question from id
      // then addQuestion(fetchedQuestion);
    }

    setAnwserInfo(answer.info ?? "");
  };

  // const handleSubAnswerChange: FormSelectProps["onChange"] = event => {
  //   const selectedAnwserValue = event.currentTarget.value;

  //   const answer = question.attributes.answers?.find(answer => answer.content === selectedAnwserValue);
  //   if (!answer) return;

  //   if (answer.subanswers) {
  //     setSubanswers(answer.subanswers);
  //   } else if (answer.destination) {
  //     // fetch question from id
  //     // then addQuestion(fetchedQuestion);
  //   }

  //   setAnwserInfo(answer.info ?? "");
  // };

  return (
    <FormGroupStep>
      <FormGroup>
        <FormGroupLabel htmlFor={`select-question-${id}`}>{question.attributes.content}</FormGroupLabel>
        {question.attributes.answers?.length && (
          <FormSelect id={`select-question-${id}`} onChange={handleAnswerChange}>
            {question.attributes.answers.map((answer, answerIdx) => (
              <option key={`${question.id}-answer-${answerIdx}`} value={answer.content}>
                {answer.content}
              </option>
            ))}
          </FormSelect>
        )}
        {subAnswers?.length && (
          <FormSelect id={`select-question-subanswer-${id}`}>
            {subAnswers.map((answer, answerIdx) => (
              <option key={`${question.id}-subanswer-${answerIdx}`} value={answer.content}>
                {answer.content}
              </option>
            ))}
          </FormSelect>
        )}
      </FormGroup>
      {question.attributes.info && (
        <Notice isInsideContent>
          <ReactMarkdown>{question.attributes.info}</ReactMarkdown>
        </Notice>
      )}
      {answerInfo && (
        <Notice isInsideContent>
          <ReactMarkdown>{answerInfo}</ReactMarkdown>
        </Notice>
      )}
    </FormGroupStep>
  );
};

import { useEffect, useState } from "react";
import { IQuestionProps } from "../lib/interfaces";

function Question(props: IQuestionProps) {
  const [checkedAnswers, setCheckedAnswers] = useState(
      props.checkedAnswers === undefined ? Array(props.question.answers.length).fill(false) : props.checkedAnswers);

  function HandleCheckbox(answerIndex: number) {
    if (props.reviewMode) { return false; }
    const updatedCheckedAnswers: boolean[] = checkedAnswers.map((checked, index) =>
      index === answerIndex ? !checked : checked
    );
    setCheckedAnswers(updatedCheckedAnswers);
  }

  useEffect(() => {
    props.UpdateAnswers(props.questionIndex, checkedAnswers);
  }, [checkedAnswers, props]);

  return (
    <>
      <h3>{props.question.questionText}</h3>
      {props.question.answers.map((answer, index) => {
        const id = 'q' + props.questionIndex.toString() + 'answer' + index.toString();
        let colorClass = '';
        if (props.reviewMode) {
          const answer = props.checkedAnswers?.[index];
          if (answer && props.question.isCorrect[index]) {
            colorClass = 'correct-answer';
          }
          else if (answer && !props.question.isCorrect[index]) {
            colorClass = 'incorrect-answer';
          }
          else if (!answer && props.question.isCorrect[index]) {
            colorClass = 'incomplete-answer';
          }
        }
        return (
          <p key={index} className={colorClass}>
            <input type='checkbox' id={id} onChange={() => HandleCheckbox(index)} 
              checked={checkedAnswers[index]} />
            <label htmlFor={id}>{answer}</label>
          </p>
        )
      })}
    </>
  )
}

export default Question;
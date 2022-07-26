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
      <span className='medium-text'>{props.question.questionText}</span>
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
          <span key={index} className={`${colorClass} answer`}>
            <input type='checkbox' id={id} onChange={() => HandleCheckbox(index)} 
              checked={checkedAnswers[index]} />
            <label className='small-text' htmlFor={id}>{answer}</label>
          </span>
        )
      })}
    </>
  )
}

export default Question;
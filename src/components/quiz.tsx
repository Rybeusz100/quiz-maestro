import { useState } from "react";
import { IQuizProps } from "../lib/interfaces";
import Question from "./question";

function Quiz(props: IQuizProps) {
  const [isFinished, setIsFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([] as boolean[][]);
  const [score, setScore] = useState([] as number[]);
  const [totalScore, setTotalScore] = useState(0);

  function GoToNextQuestion() {
    if (currentQuestionIndex < props.quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    else {
      setTotalScore(score.reduce((sum, val) => sum + val, 0));
      setIsFinished(true);
    }
  }

  function UpdateAnswers(questionIndex: number, checkedAnswers: boolean[]) {
    let newAnswers = answers;
    if (answers.length === questionIndex) {
      newAnswers.push(checkedAnswers);
    }
    else {
      newAnswers[questionIndex] = checkedAnswers;
    }
    setAnswers(newAnswers);

    // with n correct answers you get 1/n points for each correct and lose 1/n for each incorrect, can't get less than 0
    let questionScore = 0;
    const isCorrect = props.quiz.questions[questionIndex].isCorrect;
    const pointsForAns = 1 / isCorrect.filter(value => value).length;
    checkedAnswers.forEach((isChecked, index) => {
      if (isChecked && isCorrect[index]) {
        questionScore += pointsForAns;
      }
      else if (isChecked && !isCorrect[index]) {
        questionScore -= pointsForAns;
      }
    });

    questionScore = Math.max(questionScore, 0);
    
    let newScore = score;
    if (score.length === questionIndex) {
      newScore.push(questionScore);
    }
    else {
      newScore[questionIndex] = questionScore;
    }
    setScore(newScore);
  }

  function ReviewAnswers() {
    setReviewMode(true);
  }

  function BackToResults() {
    setReviewMode(false);
  }

  return (
    <>
      {!isFinished && 
      <>
        <div className='quiz-container'>
          <h2>{props.quiz.title}</h2>
          <h5>Question {currentQuestionIndex + 1} of {props.quiz.questions.length}</h5>
          <Question question={props.quiz.questions[currentQuestionIndex]} questionIndex={currentQuestionIndex} reviewMode={false} 
            UpdateAnswers={UpdateAnswers} key={currentQuestionIndex} />
          <button onClick={GoToNextQuestion}>Next</button>
        </div>
        <button onClick={props.GoToMenu}>Main Menu</button>
      </>}
      {isFinished && !reviewMode && 
      <>
        <div className='result-container'>
          <h2>Score:</h2>
          <h3>{totalScore} / {props.quiz.questions.length} - {(totalScore / props.quiz.questions.length * 100).toFixed(2)}%</h3>
          <button onClick={props.GoToMenu}>Main Menu</button>
          <button onClick={ReviewAnswers}>Review answers</button>
        </div>
      </>}
      {isFinished && reviewMode && 
      <>
        {props.quiz.questions.map((question, index) => {
          return (
              <div className='quiz-container' key={index}>
                <h5>Question {index + 1} of {props.quiz.questions.length}</h5>
                <h5>Scored {score[index]} / 1</h5>
                <Question question={question} questionIndex={index} reviewMode={true} 
                  UpdateAnswers={() => void 0} checkedAnswers={answers[index]} key={index} />
              </div>
          )
        })}
        <button onClick={props.GoToMenu}>Main Menu</button>
        <button onClick={BackToResults}>Back to results</button>
      </>}
    </>
  )
}

export default Quiz;
import { useState } from "react";
import { IQuizProps } from "../lib/interfaces";
import Question from "./question";
import { QuizMode } from "../lib/enums";
import { AddQuiz } from "../lib/utils";

function Quiz(props: IQuizProps) {
  const [mode, setMode] = useState(props.mode);
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
      setMode(QuizMode.Summary);
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

    if (mode === QuizMode.Solve) {
      UpdateScore(questionIndex, checkedAnswers);
    }
  }

  function UpdateScore(questionIndex: number, checkedAnswers: boolean[]) {
    // with n correct answers you get 1/n points for each correct and lose 1/n for each incorrect, can't get less than 0
    let questionScore = 0;
    const isCorrect = props.quiz.questions[questionIndex].isCorrect;
    let pointsForAns = 1 / isCorrect.filter(value => value).length;
    pointsForAns = isFinite(pointsForAns) ? pointsForAns : 0;
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

  function UpdateQuiz() {
    let modifiedQuiz = props.quiz;
    answers.forEach((ans, index) => {
      modifiedQuiz.questions[index].isCorrect = ans;
    });

    let newQuizzes = AddQuiz(modifiedQuiz);
    props.UpdateQuizzes(newQuizzes);
  }

  function ReviewAnswers() {
    setMode(QuizMode.Review);
  }

  function BackToResults() {
    setMode(QuizMode.Summary);
  }

  return (
    <>
      {mode === QuizMode.Solve && 
      <>
        <div className='top-nav'>
          <button onClick={props.GoToMenu}>Main Menu</button>
        </div>
        <div className='quiz-container'>
          <span className='large-text'>{props.quiz.title}</span>
          <span className='small-text'>Question {currentQuestionIndex + 1} of {props.quiz.questions.length}</span>
          <Question question={props.quiz.questions[currentQuestionIndex]} questionIndex={currentQuestionIndex} reviewMode={false} 
            UpdateAnswers={UpdateAnswers} key={currentQuestionIndex} />
          <button onClick={GoToNextQuestion}>Next</button>
        </div>
      </>}
      {mode === QuizMode.Summary && 
      <>
        <div className='top-nav'>
          <button onClick={props.GoToMenu}>Main Menu</button>
          <button onClick={ReviewAnswers}>Review answers</button>
        </div>
        <div className='quiz-container'>
          <span className='large-text'>Score:</span>
          <span className='medium-text'  id='summary'>{totalScore.toFixed(2)} / {props.quiz.questions.length} - {(totalScore / props.quiz.questions.length * 100).toFixed(2)}%</span>
        </div>
      </>}
      {mode === QuizMode.Review && 
      <>
        <div className='top-nav'>
          <button onClick={props.GoToMenu}>Main Menu</button>
          <button onClick={BackToResults}>Back to results</button>
        </div>
        {props.quiz.questions.map((question, index) => {
          return (
              <div className='quiz-container' key={index}>
                <span className='large-text'>Question {index + 1} of {props.quiz.questions.length}</span>
                <span className='small-text' id='review'>Scored {score[index]} / 1</span>
                <Question question={question} questionIndex={index} reviewMode={true} 
                  UpdateAnswers={() => void 0} checkedAnswers={answers[index]} key={index} />
              </div>
          )
        })}
      </>}
      {mode === QuizMode.Edit &&
      <>
        <div className='top-nav'>
          <button onClick={props.GoToMenu}>Main Menu</button>
          <button onClick={UpdateQuiz}>Save</button>
        </div>
        {props.quiz.questions.map((question, index) => {
          return (
              <div className='quiz-container' key={index}>
                <span className='large-text'>Question {index + 1} of {props.quiz.questions.length}</span>
                <Question question={question} questionIndex={index} reviewMode={false} 
                  UpdateAnswers={UpdateAnswers} checkedAnswers={question.isCorrect} key={index} />
              </div>
          )
        })}
      </>}
    </>
  )
}

export default Quiz;
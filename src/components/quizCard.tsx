import { IQuizCardProps } from "../lib/interfaces";

function QuizCard(props: IQuizCardProps) {
  return (
    <div className='quiz-card'>
      <h3>{props.quiz.title}</h3>
      <span>Questions: {props.quiz.questions.length}</span>
      <button onClick={() => props.StartQuiz(props.quiz.id)}>Start quiz</button>
      <button onClick={() => props.EditQuiz(props.quiz.id)}>Edit</button>
      <button>Export</button>
      <button>Delete</button>
    </div>
  )
}

export default QuizCard;
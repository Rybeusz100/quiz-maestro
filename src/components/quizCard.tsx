import { IQuizCardProps } from "../lib/interfaces";
import { DeleteQuiz } from "../lib/utils";
import { saveAs } from 'file-saver';

function QuizCard(props: IQuizCardProps) {

  function ExportQuiz() {
    const json = JSON.stringify(props.quiz);
    const blob = new Blob([json],
      { type: 'application/json' });
    saveAs(blob, props.quiz.title + '.json');
  }

  return (
    <div className='quiz-card'>
      <h3>{props.quiz.title}</h3>
      <span>Questions: {props.quiz.questions.length}</span>
      <button onClick={() => props.StartQuiz(props.quiz.id)}>Start quiz</button>
      <button onClick={() => props.EditQuiz(props.quiz.id)}>Edit</button>
      <button onClick={ExportQuiz}>Export</button>
      <button onClick={() => props.UpdateQuizzes(DeleteQuiz(props.quiz.id))}>Delete</button>
    </div>
  )
}

export default QuizCard;
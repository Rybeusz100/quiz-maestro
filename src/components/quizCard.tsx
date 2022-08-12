import { IQuizCardProps } from "../lib/interfaces";
import { DeleteQuiz } from "../lib/utils";
import { saveAs } from 'file-saver';

function QuizCard(props: IQuizCardProps) {

  function ExportQuiz() {
    const json = JSON.stringify(props.quiz, null, 2);
    const blob = new Blob([json],
      { type: 'application/json' });
    saveAs(blob, props.quiz.title + '.json');
  }

  return (
    <div className='quiz-card'>
      <span className='large-text'>{props.quiz.title}</span>
      <span className='medium-text'>Questions: {props.quiz.questions.length}</span>
      <div className='quiz-card-nav'>
        <button onClick={() => props.StartQuiz(props.quiz.id)}>Start Quiz</button>
        <button onClick={() => props.EditQuiz(props.quiz.id)}>Edit</button>
        <button onClick={ExportQuiz}>Export</button>
        <button className='delete' onClick={() => props.UpdateQuizzes(DeleteQuiz(props.quiz.id))}>Delete</button>
      </div>
    </div>
  )
}

export default QuizCard;
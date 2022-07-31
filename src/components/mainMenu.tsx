import { IMainMenuProps, IQuiz } from '../lib/interfaces';
import { quiz1, quiz2 } from '../quizy-test';
import QuizCard from './quizCard';

function MainMenu(props: IMainMenuProps) {

  return (
    <>
      <div className='quizzes-holder'>
        {props.quizzes.map && props.quizzes.map((quiz: IQuiz, index: number) => {
          return (
            <QuizCard quiz={quiz} StartQuiz={props.StartQuiz} EditQuiz={props.EditQuiz} 
              UpdateQuizzes={props.UpdateQuizzes} key={index} />
            )
        })}
      </div>
      <button onClick={() => props.UpdateQuizzes([quiz1, quiz2])}>Load example quizzes</button>
    </>
  )
}

export default MainMenu;
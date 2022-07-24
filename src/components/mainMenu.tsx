import { IMainMenuProps, IQuiz } from '../lib/interfaces';
import QuizCard from './quizCard';

function MainMenu(props: IMainMenuProps) {

  return (
    <div className='quizzes-holder'>
      {props.quizzes.map((quiz: IQuiz, index: number) => {
        return (
          <QuizCard quiz={quiz} StartQuiz={props.StartQuiz} key={index} />
          )
      })}
    </div>
  )
}

export default MainMenu;
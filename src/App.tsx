import { useState } from 'react';
import MainMenu from './components/mainMenu';
import { quiz1, quiz2 } from './quizy-test';
import { Mode } from './lib/enums';
import Quiz from './components/quiz';
import { GetRandomizedQuiz } from './lib/utils';

function App() {
  const [quizzes] = useState(JSON.parse(localStorage.getItem('quizzes') || '{}'));
  const [mode, setMode] = useState(Mode.MainMenu);
  const [activeQuizId, setActiveQuizId] = useState(-1);

  localStorage.setItem('quizzes', JSON.stringify([quiz1, quiz2]));

  function StartQuiz(id: number) {
    setActiveQuizId(id);
    setMode(Mode.Quiz);
  }

  function GoToMenu() {
    setMode(Mode.MainMenu);
  }

  return (
    <>
      {mode === Mode.MainMenu && <MainMenu quizzes={quizzes} StartQuiz={StartQuiz}/>}
      {mode === Mode.Quiz && <Quiz quiz={GetRandomizedQuiz(quizzes, activeQuizId)} GoToMenu={GoToMenu} />}
    </>
  );
}

export default App;

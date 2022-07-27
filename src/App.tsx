import { useState } from 'react';
import MainMenu from './components/mainMenu';
import { Mode, QuizMode } from './lib/enums';
import Quiz from './components/quiz';
import { FindQuizWithId, GetRandomizedQuiz } from './lib/utils';
import { IQuiz } from './lib/interfaces';

function App() {
  const [quizzes, setQuizzes] = useState(JSON.parse(localStorage.getItem('quizzes') || '{}'));
  const [mode, setMode] = useState(Mode.MainMenu);
  const [activeQuizId, setActiveQuizId] = useState(-1);

  function StartQuiz(id: number) {
    setActiveQuizId(id);
    setMode(Mode.SolveQuiz);
  }

  function EditQuiz(id: number) {
    setActiveQuizId(id);
    setMode(Mode.EditQuiz);
  }

  function GoToMenu() {
    setMode(Mode.MainMenu);
  }

  function UpdateQuizzes(newQuizzes: IQuiz[]) {
    setQuizzes(newQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(newQuizzes));
  }

  return (
    <>
      {mode === Mode.MainMenu && <MainMenu quizzes={quizzes} StartQuiz={StartQuiz} EditQuiz={EditQuiz} UpdateQuizzes={UpdateQuizzes} />}
      {mode === Mode.SolveQuiz && <Quiz quiz={GetRandomizedQuiz(quizzes, activeQuizId)} mode={QuizMode.Solve} GoToMenu={GoToMenu} UpdateQuizzes={UpdateQuizzes} />}
      {mode === Mode.EditQuiz && <Quiz quiz={FindQuizWithId(quizzes, activeQuizId)} mode={QuizMode.Edit} GoToMenu={GoToMenu} UpdateQuizzes={UpdateQuizzes} />}
    </>
  );
}

export default App;

import { Mode, QuizMode } from "./enums"

export interface IQuestion {
  questionText: string,
  answers: string[],
  isCorrect: boolean[]
};

export interface IQuestionProps {
  question: IQuestion,
  questionIndex: number,
  reviewMode: boolean,
  checkedAnswers?: boolean[],
  UpdateAnswers: (questionIndex: number, checkedAnswers: boolean[]) => void
}

export interface IQuiz {
  id: number,
  title: string,
  questions: IQuestion[],
};

export interface IQuizProps {
  quiz: IQuiz,
  mode: QuizMode,
  GoToMenu: () => void,
  UpdateQuizzes: (newQuizzes: IQuiz[]) => void
};

export interface IMainMenuProps {
  quizzes: IQuiz[],
  StartQuiz: (id: number) => void,
  EditQuiz: (id: number) => void,
  UpdateQuizzes: (newQuizzes: IQuiz[]) => void
}

export interface IQuizCardProps {
  quiz: IQuiz,
  StartQuiz: (id: number) => void,
  EditQuiz: (id: number) => void,
  UpdateQuizzes: (newQuizzes: IQuiz[]) => void
}
import { Mode } from "./enums"

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
  GoToMenu: () => void
};

export interface IMainMenuProps {
  quizzes: IQuiz[],
  StartQuiz: (index: number) => void
}

export interface IQuizCardProps {
  quiz: IQuiz,
  StartQuiz: (index: number) => void
}
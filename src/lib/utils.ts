import { IQuestion, IQuiz } from "./interfaces";

export function GetShuffledArray(length: number) {
  return Array(length).fill(0).map((_, i) => i).sort(() => Math.random() - 0.5);
}

export function FindQuizWithId(quizzes: IQuiz[], id: number) {
  return quizzes.filter((quiz) => {
    return quiz.id === id
  })[0]
}

export function GetRandomizedQuiz(quizzes: IQuiz[], id: number) {
  const quiz = FindQuizWithId(quizzes, id);
  let randomizedQuestions = [] as IQuestion[];

  quiz.questions.forEach(q => {
    let randomizedAnswers = [] as string[];
    let correctAnswers = [] as boolean[];
    const answerOrder = GetShuffledArray(q.answers.length);

    answerOrder.forEach(index => {
      randomizedAnswers.push(q.answers[index]);
      correctAnswers.push(q.isCorrect[index]);
    });

    const randomizedQuestion: IQuestion = {
      questionText: q.questionText,
      answers: randomizedAnswers,
      isCorrect: correctAnswers
    };
    randomizedQuestions.push(randomizedQuestion);
  });

  let randomizedQuiz: IQuiz = { id: quiz.id, title: quiz.title, questions: [] };

  const questionOrder = GetShuffledArray(randomizedQuestions.length);
  questionOrder.forEach(index => {
    randomizedQuiz.questions.push(randomizedQuestions[index]);
  });

  return randomizedQuiz;
}

export function AddQuiz(quiz: IQuiz) {
  let quizzes: IQuiz[] = JSON.parse(localStorage.getItem('quizzes') || '{}');

  let index = -1;
  if (quizzes.findIndex) {
    index = quizzes.findIndex(q => q.id === quiz.id);
  }

  if (index >= 0) {
    quizzes[index] = quiz;
  }
  else {
    if (quizzes.push) {
      quizzes.push(quiz);
    }
    else {
      quizzes = [quiz];
    }
  }

  return quizzes;
}
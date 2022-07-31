import { IQuestion, IQuiz } from "./interfaces";
import { v4 as uuidv4 } from 'uuid';

export function GetShuffledArray(length: number) {
  return Array(length).fill(0).map((_, i) => i).sort(() => Math.random() - 0.5);
}

export function FindQuizWithId(quizzes: IQuiz[], id: string) {
  return quizzes.filter((quiz) => {
    return quiz.id === id
  })[0]
}

export function GetRandomizedQuiz(quizzes: IQuiz[], id: string) {
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
  let quizzes: IQuiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');

  let index = quizzes.findIndex(q => q.id === quiz.id);

  if (index >= 0) {
    quizzes[index] = quiz;
  }
  else {
    quizzes.push(quiz);
  }

  return quizzes;
}

export function DeleteQuiz(id: string) {
  let quizzes: IQuiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');

  let index = quizzes.findIndex(q => q.id === id);

  if (index >= 0) {
    quizzes.splice(index, 1);
  }

  return quizzes;
}

export function TextToQuiz(fileName: string, text: string): IQuiz {
  const questions: IQuestion[] = text.split(/\r?\n\r?\n/).map(q => {
    let elements = q.split(/\r?\n/);
    const questionText = elements.shift() || "";

    return {
      questionText: questionText,
      answers: elements,
      isCorrect: Array(elements.length).fill(false)
    }
  });

  const id = uuidv4();
  const title = fileName.replaceAll('_', ' ')
    .split('.')
    .shift() || 'empty name';

  return {
    id: id,
    title: title,
    questions: questions
  }
}
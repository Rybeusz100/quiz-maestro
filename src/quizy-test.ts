import { IQuiz } from "./lib/interfaces";

export const quiz1: IQuiz = {
    id: 0,
    title: 'European capitals',
    questions: [
        {
        questionText: 'What is the capital of Poland?',
        answers: ['Warsaw', 'Cracow', 'Boat'],
        isCorrect: [true, false, false]
        },
        {
        questionText: 'What is the capital of France?',
        answers: ['Copenhagen', 'Berlin', 'Paris'],
        isCorrect: [false, false, true]
        }
    ]
};

export const quiz2: IQuiz = {
    id: 1,
    title: 'Rubik\'s cube world records',
    questions: [
        {
        questionText: 'What is the world record for 2x2?',
        answers: ['1.00', '0.49', '2.02'],
        isCorrect: [false, true, false]
        },
        {
        questionText: 'What is the world record for 3x3?',
        answers: ['3.47', '11.20'],
        isCorrect: [true, false]
        },
        {
        questionText: 'What is the world record for FMC?',
        answers: ['5', '50', '42', '16', '21.00'],
        isCorrect: [false, false, false, true, true]
        },
    ]
};
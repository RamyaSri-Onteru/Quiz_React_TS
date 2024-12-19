import { shuffleArray } from "./utils";
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export const fetchQuizQuestions = async () => {
  const endpoint = `https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple`;
  // const API_URL = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`;

  //   const res = await fetch(endpoint);
  //   const data = await res.json();
  //   console.log(data);

  const data = await (await fetch(endpoint)).json();
  //   console.log(data.results);

  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

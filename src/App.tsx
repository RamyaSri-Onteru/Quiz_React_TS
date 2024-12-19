import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
import { QuestionState } from "./API";
import QuestionCard from "./components/QuestionCard";
import "./css/App.css";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [submit, setSubmit] = useState(false);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    setSubmit(false);
    const newQuestions = await fetchQuizQuestions();
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore((prev) => prev + 1);
      }

      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct: correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
    } else {
      setNumber(nextQuestion);
    }
  };

  const handleSubmit = () => {
    setSubmit(true);
    setGameOver(true); // Prevent any further questions from rendering
  };

  return (
    <>
      <h1>React Quiz</h1>

      {submit && gameOver ? (
        <>
          <p className="score">
            Your Score is: {score}/{TOTAL_QUESTIONS}
          </p>
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        </>
      ) : (
        <>
          {gameOver && (
            <button className="start" onClick={startTrivia}>
              Start
            </button>
          )}

          {loading && <p>Loading Questions...</p>}

          {!loading && !gameOver && (
            <QuestionCard
              questionNo={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}

          {!gameOver &&
            !loading &&
            userAnswers.length === number + 1 &&
            number !== TOTAL_QUESTIONS - 1 && (
              <button className="next" onClick={nextQuestion}>
                Next Question
              </button>
            )}

          {number === TOTAL_QUESTIONS - 1 && !loading && (
            <button className="submit" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </>
      )}
    </>
  );
}

export default App;

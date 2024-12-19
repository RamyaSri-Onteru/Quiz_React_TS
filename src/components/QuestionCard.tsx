import { FC } from "react";
import { AnswerObject } from "../App";
import "./QuestionCard.css";
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNo: number;
  totalQuestions: number;
};
const QuestionCard: FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNo,
  totalQuestions,
}) => {
  return (
    <div className="question-card">
      <p className="number">
        Question:{questionNo}/{totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div>
        {answers.map((answer) => {
          const isCorrect = userAnswer?.correctAnswer === answer;
          const isSelected = userAnswer?.answer === answer;
          return (
            <div key={answer}>
              <button
                className="answer-button"
                disabled={userAnswer ? true : false}
                value={answer}
                onClick={callback}
                style={{
                  backgroundColor: isCorrect
                    ? "green"
                    : isSelected
                    ? "red"
                    : "",
                  color: isCorrect || isSelected ? "white" : "black",
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }}></span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;

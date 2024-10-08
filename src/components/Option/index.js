import classNames from "classnames";
import { useQuiz } from "../../contexts/QuizContext";

function Option({ question, answer }) {
  const quiz = useQuiz();

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={classNames(
            "btn btn-option",
            {
              answer: answer === index,
            },
            { correct: index === question.correctOption && answer !== null },
            { wrong: index !== question.correctOption && answer !== null }
          )}
          disabled={answer !== null}
          key={option}
          onClick={() => quiz.newAnswer(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;

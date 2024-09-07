import classNames from "classnames";

function Option({ question, dispatch, answer }) {
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
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: index,
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;

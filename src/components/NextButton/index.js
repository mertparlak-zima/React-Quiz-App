function NextButton({ dispatch, children, answer, questionsLength }) {
  if (answer === questionsLength - 1) {
    dispatch({ type: "finished" });
  }
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      {children}
    </button>
  );
}

export default NextButton;

function NextButton({ dispatch, answer, children }) {
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

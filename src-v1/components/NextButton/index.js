function NextButton({ dispatch, children, questionsLength, index }) {
  function updateState() {
    if (index === questionsLength - 1) {
      dispatch({ type: "finished" });
      return;
    } else {
      dispatch({ type: "nextQuestion" });
    }
  }

  return (
    <button className="btn btn-ui" onClick={updateState}>
      {children}
    </button>
  );
}

export default NextButton;

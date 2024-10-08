import { useQuiz } from "../../contexts/QuizContext";

function NextButton({ children, questionsLength, index }) {
  const quiz = useQuiz();
  function updateState() {
    if (index === questionsLength - 1) {
      quiz.finished();
      return;
    } else {
      quiz.nextQuestion();
    }
  }

  return (
    <button className="btn btn-ui" onClick={updateState}>
      {children}
    </button>
  );
}

export default NextButton;

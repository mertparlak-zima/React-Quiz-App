import { useQuiz } from "../../contexts/QuizContext";

function Ready({ questionsLength }) {
  const quiz = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsLength || "X"} questions to test your React Mastety</h3>
      <button onClick={() => quiz.ready()} className="btn btn-ui">
        Let's Start
      </button>
    </div>
  );
}

export default Ready;

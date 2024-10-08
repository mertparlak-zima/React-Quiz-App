import { useQuiz } from "../../contexts/QuizContext";

export default function FinishScreen({ points, maxPoints, highscore }) {
  const percentage = (points / maxPoints) * 100;
  const quiz = useQuiz();

  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)} %)
      </p>
      <p className="highscore">Highscore: {highscore}</p>
      <button className="btn btn-ui" onClick={() => quiz.restart()}>
        Restart
      </button>
    </>
  );
}

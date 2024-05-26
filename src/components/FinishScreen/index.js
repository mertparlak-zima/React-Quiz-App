export default function FinishScreen({ points, maxPoints, highscore }) {
  const percentage = (points / maxPoints) * 100;

  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)} %)
      </p>
      <p className="highscore">Highscore: {highscore}</p>
    </>
  );
}

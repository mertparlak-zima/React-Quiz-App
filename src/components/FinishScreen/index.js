export default function FinishScreen({ points, maxPoints }) {
  const percentage = (points / maxPoints) * 100;

  return (
    <p className="result">
      You Scored <strong>{points}</strong> out of {maxPoints} (
      {Math.ceil(percentage)} %)
    </p>
  );
}
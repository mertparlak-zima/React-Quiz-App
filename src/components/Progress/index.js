function Progress({ index, number, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress max={number} value={index + Number(answer != null)} />
      <p>
        Question{" "}
        <strong>
          {index} / {number}
        </strong>
      </p>
      <p>
        Points{" "}
        <strong>
          {points} / {maxPoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;

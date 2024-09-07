import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Ready from "./components/Ready";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import { useQuiz } from "./contexts/QuizContext";

export default function App() {
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = useQuiz();

  const questionsLength = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Ready questionsLength={questionsLength} />}
        {status === "active" && (
          <>
            {status === "active" && (
              <Progress
                index={index + 1}
                number={questionsLength}
                points={points}
                maxPoints={maxPoints ? maxPoints : 0}
                answer={answer}
              />
            )}
            <Question question={questions[index]} answer={answer} />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} />
              {answer !== null && (
                <NextButton questionsLength={questionsLength} index={index}>
                  {index === questionsLength - 1 ? "Finish" : "Next"}
                </NextButton>
              )}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

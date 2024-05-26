import { act, useEffect, useReducer } from "react";
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

const SECONDS_PER_QUESTION = 30;

function reducer(state, action) {
  try {
    switch (action.type) {
      case "dataRecived":
        return { ...state, questions: action.payload, status: "ready" };
      case "failed":
        return { ...state, status: "error" };
      case "dataFailed":
        return { ...state, status: "error" };
      case "active":
        return {
          ...state,
          status: "active",
          secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
        };
      case "finished":
        const highscore = JSON.parse(localStorage.getItem("highscore"));

        if (state.points > highscore) {
          localStorage.setItem("highscore", JSON.stringify(state.points));
        }

        return {
          ...state,
          status: "finished",
          highscore: highscore ? highscore : 0,
        };
      case "newAnswer":
        const currentQuestion = state.questions[state.index];

        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === currentQuestion.correctOption
              ? state.points + currentQuestion.points
              : state.points,
        };
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case "restart":
        return {
          ...initialState,
          status: "ready",
          questions: state.questions,
        };
      case "timer": {
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
        };
      }
      default: {
        throw new Error(`Unsupported action type ${action.type}`);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
}

const storedHScore = JSON.parse(localStorage.getItem("highscore"));

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: storedHScore ? storedHScore : 0,
  secondsRemaining: null,
};
export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionsLength = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Ready questionsLength={questionsLength} dispatch={dispatch} />
        )}
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
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              {answer !== null && (
                <NextButton
                  dispatch={dispatch}
                  questionsLength={questionsLength}
                  index={index}
                >
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
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

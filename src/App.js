import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Ready from "./components/Ready";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";

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
        return { ...state, status: "active" };
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
        if (state.index === state.questions.length - 1) {
          return { ...state, status: "finished" };
        }
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      default: {
        throw new Error(`Unsupported action type ${action.type}`);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
}

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
            {/* check if it is the last question */}
            {answer !== null && questions.length - 1 !== answer && (
              <NextButton dispatch={dispatch} answer={answer}>
                Next
              </NextButton>
            )}
          </>
        )}
        {status === "finished" && <div>bitti {points}</div>}
      </Main>
    </div>
  );
}

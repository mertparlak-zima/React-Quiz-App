import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Ready from "./components/Ready";

function reducer(state, action) {
  try {
    switch (action.type) {
      case "dataRecived":
        return { ...state, questions: action.payload, status: "ready" };
      case "failed":
        return { ...state, status: "error" };
      case "dataFailed":
        return { ...state, status: "error" };
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
};
export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const questionsLength = questions.length;

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
        {status === "ready" && <Ready questionsLength={questionsLength} />}
      </Main>
    </div>
  );
}

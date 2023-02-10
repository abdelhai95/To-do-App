import { useState, useReducer, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import * as moment from "moment";
import List from "./List.jsx";

function reducer(state, action) {
  switch (action.type) {
    case "ADD-TASK":
      return [...state, newItem(action.payload.item)];
    case "EDIT":
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, editing: !todo.editing, task: action.payload.text };
        }
        return todo;
      });
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload.id);
    default:
      return state;
  }
}

// Adding a new task with ID
const newItem = function (item) {
  return { id: Date.now(), task: item, editing: false };
};

function App() {
  let date;
  let m = moment();
  const [state, dispatch] = useReducer(reducer, []);
  const [item, setItem] = useState("Add a new task");
  function updateTime() {
    date = m.calendar();
  }

  updateTime();
  setInterval(() => {
    updateTime();
  }, 1000);

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch({ type: "ADD-TASK", payload: { item: item } });
    // clear the input field after triggering the action
    setItem("Add a new task");
  };
  return (
    <section className="glass section">
      <div className="date">
        <p>{date}</p>
      </div>
      <div className="main-input-parent">
        <input
          className="main-input"
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onFocus={(e) => setItem("")}
        />
        <button className="main-btn btn" type="submit" onClick={handleSubmit}>
          Add Task
        </button>
      </div>
      {state.map((item) => {
        return <List key={item.id} item={item} dispatch={dispatch} />;
      })}
    </section>
  );
}

export default App;

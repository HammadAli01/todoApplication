import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddTodo } from "./components/AddTodo";
import { TodoLists } from "./components/TodoLists";
function App() {
  return (
    <div className="App">
      <div className="container p-4 mt-2">
        <h2>Todo Application</h2>
        <AddTodo />
        <TodoLists />
      </div>
    </div>
  );
}

export default App;

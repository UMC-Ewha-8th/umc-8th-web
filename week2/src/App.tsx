import "./App.css";
import Todo2 from "./components/Todo2";
import { TodoProvider } from "./context/TodoProvider";

function App() {
  return (
    <TodoProvider>
      <Todo2 />
    </TodoProvider>
  );
}

export default App;

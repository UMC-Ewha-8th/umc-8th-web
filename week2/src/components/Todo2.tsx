import TodoForm from "./TodoForm";
import { TodoList } from "./TodoList";
import { useTodo } from "../context/useTodo";

const Todo2 = () => {
  const { todos, completeTodo, deleteTodo, doneTodos } = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container_header">SUMMER TODO</h1>
      <TodoForm />
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="#28a745"
          onClick={completeTodo}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLabel="삭제"
          buttonColor="red"
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo2;

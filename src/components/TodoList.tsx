import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTodos, updateTodosOrder } from "../features/todos/todosSlice";
import AddTodoForm from "./AddTodoForm";
import FilterTodo from "./FilterTodo";
import TodoItem from "./TodoItem";
import { useDrop } from "react-dnd";

const TodoList: React.FC = () => {
  const todos = useSelector(selectTodos);

  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "TODO_ITEM",
    hover(item: { id: number; index: number }) {
      const dragIndex = item.index;
      const hoverIndex = todos.findIndex((todo) => todo.id === item.id);

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch(updateTodosOrder({ dragIndex, hoverIndex }));
    },
  });

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1 style={{ color: "#333" }}>List of cases</h1>
      <AddTodoForm />
      <FilterTodo />
      <ul
        ref={drop}
        style={{ listStyleType: "none", padding: "0", margin: "0" }}
      >
        {todos.map((todo, index) => (
          <TodoItem key={todo.id} todo={todo} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

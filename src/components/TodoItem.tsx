import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Todo } from "../features/todos/TodoService";
import {
  toggleTodo,
  removeTodo,
  editTodo,
  updateTodosOrder,
} from "../features/todos/todosSlice";
import { useDrag, useDrop } from "react-dnd";

interface DragItem {
  id: number;
  index: number;
}

interface TodoItemProps {
  todo: Todo;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const [, drag] = useDrag({
    type: "TODO_ITEM",
    item: { type: "TODO_ITEM", id: todo.id, index },
  });

  const [, drop] = useDrop({
    accept: "TODO_ITEM",
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch(updateTodosOrder({ dragIndex, hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleRemove = () => {
    dispatch(removeTodo(todo.id));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    dispatch(editTodo({ id: todo.id, newText }));
    setEditMode(false);
  };

  // Обработчик для отмены редактирования
  const handleCancelEdit = () => {
    setNewText(todo.text);
    setEditMode(false);
  };

  return (
    <li
      ref={(node) => drag(drop(node))}
      style={{
        border: "1px solid #ddd",
        borderRadius: "4px",
        margin: "5px 0",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: todo.completed ? "#e6ffe6" : "inherit",
      }}
    >
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      {editMode ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleRemove}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;

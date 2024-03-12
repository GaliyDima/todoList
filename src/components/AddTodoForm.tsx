import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";

const AddTodoForm: React.FC = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo("");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleAddTodo}>Add item</button>
    </div>
  );
};

export default AddTodoForm;

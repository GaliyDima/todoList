import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";
import Input from "./Input/Input";
import Button from "./Button/Button";

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
      <Input newTodo={newTodo} setNewTodo={setNewTodo} />
      <Button onClick={handleAddTodo} title={"Add item"} />
    </div>
  );
};

export default AddTodoForm;

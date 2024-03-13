import React from "react";
import "./Input.css";

interface IInput {
  newTodo: string;
  setNewTodo: (value: string) => void;
}

const Input: React.FC<IInput> = ({ newTodo, setNewTodo }) => {
  return (
    <div className="input-container">
      <input
        placeholder="Enter item"
        className="input-field"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <label htmlFor="input-field" className="input-label">
        Enter item
      </label>
      <span className="input-highlight"></span>
    </div>
  );
};

export default Input;

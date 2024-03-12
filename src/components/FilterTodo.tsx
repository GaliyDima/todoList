import React from "react";
import { useDispatch } from "react-redux";
import {
  filterCompleted,
  filterNotCompleted,
  noFilter,
} from "../features/todos/todosSlice";

const FilterTodo: React.FC = () => {
  const dispatch = useDispatch();

  const handleFilterCompleted = () => {
    dispatch(filterCompleted());
  };

  const handleFilterNotCompleted = () => {
    dispatch(filterNotCompleted());
  };

  const handleSortByDate = () => {
    dispatch(noFilter());
  };

  return (
    <div style={{ margin: "20px" }}>
      <button onClick={handleFilterCompleted} style={{ marginRight: "5px" }}>
        Completed
      </button>
      <button onClick={handleFilterNotCompleted} style={{ marginRight: "5px" }}>
        Not completed
      </button>
      <button onClick={handleSortByDate}>Show all</button>
    </div>
  );
};

export default FilterTodo;

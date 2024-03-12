import { Todo } from "../features/todos/TodoService";

export const TodoService = {
  getTodosFromLocalStorage: (): Todo[] => {
    const todosStr = localStorage.getItem("todos");
    return todosStr ? JSON.parse(todosStr) : [];
  },

  saveTodosToLocalStorage: (todos: Todo[]): void => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },
};

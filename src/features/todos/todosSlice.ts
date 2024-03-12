import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { TodoService } from "./TodoService";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodosState {
  list: Todo[];
}

const initialState: TodosState = {
  list: TodoService.getTodosFromLocalStorage(),
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.list.push(newTodo);
      TodoService.saveTodosToLocalStorage(state.list);
    },

    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.list.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        TodoService.saveTodosToLocalStorage(state.list);
      }
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
      TodoService.saveTodosToLocalStorage(state.list);
    },

    editTodo: (
      state,
      action: PayloadAction<{ id: number; newText: string }>
    ) => {
      const todo = state.list.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.newText;
        TodoService.saveTodosToLocalStorage(state.list);
      }
    },

    filterCompleted: (state) => {
      const originalList = TodoService.getTodosFromLocalStorage();
      state.list = originalList.filter((todo) => todo.completed);
    },

    filterNotCompleted: (state) => {
      const originalList = TodoService.getTodosFromLocalStorage();
      state.list = originalList.filter((todo) => !todo.completed);
    },

    noFilter: (state) => {
      state.list = TodoService.getTodosFromLocalStorage();
    },

    updateTodosOrder: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const newTodos = [...state.list];
      const [draggedItem] = newTodos.splice(dragIndex, 1);
      newTodos.splice(hoverIndex, 0, draggedItem);
      state.list = newTodos;
      TodoService.saveTodosToLocalStorage(newTodos);
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  editTodo,
  filterCompleted,
  filterNotCompleted,
  noFilter,
  updateTodosOrder,
} = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.list;

export default todosSlice.reducer;

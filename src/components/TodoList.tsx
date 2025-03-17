import {
  Box,
} from "@mui/material";
import { JSX } from "react";
import { Todo } from "../types/Todo";
import TodoCard from "./TodoCard";

type Props = {
  todos: Todo[];
  onUpdateTodo: (updatedTodo: Todo) => void;
  onDeleteTodo: (deletedTodo: Todo) => void;
};

function TodoList({ todos, onUpdateTodo, onDeleteTodo }: Props): JSX.Element {
  return (
    <Box sx={{ mt: 2 }}>
      {todos.map(todo => <TodoCard key={todo.id} todo={todo} onUpdateTodo={onUpdateTodo} onDeleteTodo={onDeleteTodo} />)}
    </Box>
  );
}

export default TodoList;

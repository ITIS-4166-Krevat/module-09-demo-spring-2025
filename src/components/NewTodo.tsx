import { Box, Button, TextField } from "@mui/material";
import { JSX, useState } from "react";
import { Todo } from "../types/Todo";

type Props = {
  onCreateTodo: (newTodo: Todo) => void;
};

function NewTodo({ onCreateTodo }: Props): JSX.Element {
  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');

  function createTodo() {
    if (!todoName || !todoDescription) return;
    const newTodo: Todo = {
      id: Math.round(Math.random() * 100_000),
      name: todoName,
      description: todoDescription,
      isComplete: false,
    };
    onCreateTodo(newTodo);
    setTodoName('');
    setTodoDescription('');
  }

  return (
    <Box component='form' sx={{ mb: 4, p: 2 }} onSubmit={e => { e.preventDefault(); createTodo(); }}>
      <TextField
        label="Todo Name"
        required
        fullWidth
        value={todoName}
        onChange={e => setTodoName(e.target.value)}
      />
      <TextField
        label="Description"
        required
        multiline
        maxRows={4}
        fullWidth
        sx={{ mt: 2 }}
        value={todoDescription}
        onChange={e => setTodoDescription(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Create Todo</Button>
    </Box>
  );
}

export default NewTodo;

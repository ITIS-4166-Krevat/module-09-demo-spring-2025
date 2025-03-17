import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

type Todo = {
  id: number;
  name: string;
  description: string;
  isComplete: boolean;
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
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
    setTodos(todos => [...todos, newTodo]);
    setTodoName('');
    setTodoDescription('');
  }

  function checkTodo(todoId: number) {
    setTodos(todos => {
      // return todos.map(todo => {
      //   if (todo.id !== todoId) {
      //     return todo;
      //   }
      //   return {
      //     ...todo,
      //     isComplete: !todo.isComplete,
      //   };
      // });
      const newTodos: Todo[] = [];
      for (const oldTodo of todos) {
        if (oldTodo.id !== todoId) {
          newTodos.push(oldTodo);
          continue;
        }
        newTodos.push({ ...oldTodo, isComplete: !oldTodo.isComplete });
      }
      return newTodos;
    });
  }

  function deleteTodo(todoId: number): void {
    setTodos(todos => todos.filter(todo => todo.id !== todoId));
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container sx={{ mt: 2 }}>
          <Typography variant='h3'>Todo List App</Typography>
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
          <Box sx={{ mt: 2 }}>
            {todos.map(todo => (
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Box>
                        <Checkbox checked={todo.isComplete} onChange={() => checkTodo(todo.id)} />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ textDecoration: todo.isComplete ? 'line-through' : undefined }}>
                          {todo.name}
                        </Typography>
                        <Typography variant="body1">
                          {todo.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton onClick={() => deleteTodo(todo.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App

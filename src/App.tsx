import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Link,
  ThemeProvider,
} from "@mui/material"
import { JSX, useState } from "react";
import Header from "./components/Header";
import { Todo } from "./types/Todo";
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";
import { BrowserRouter, NavLink, Route, Routes } from "react-router";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);

  function addNewTodo(newTodo: Todo) {
    setTodos(todos => [...todos, newTodo]);
  }

  function updateTodo(updatedTodo: Todo): void {
    // setTodos(todos => todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    setTodos(todos => {
      const updatedTodos: Todo[] = [];
      for (const originalTodo of todos) {
        if (originalTodo.id === updatedTodo.id) {
          updatedTodos.push(updatedTodo);
        } else {
          updatedTodos.push(originalTodo);
        }
      }
      return updatedTodos;
    });
  }

  function deleteTodo(todoToDelete: Todo): void {
    setTodos(todos => todos.filter(todo => todo.id !== todoToDelete.id));
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container sx={{ mt: 2 }}>
          <Header />
          <BrowserRouter>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Link component={NavLink} to="/" underline='none'>Todos</Link>
              <Link component={NavLink} to="/todos/new" underline='none'>New Todo</Link>
            </Box>
            <Routes>
              <Route index element={<TodoList todos={todos} onUpdateTodo={updateTodo} onDeleteTodo={deleteTodo} />} />
              <Route path="/todos/new" element={<NewTodo onCreateTodo={addNewTodo} />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App

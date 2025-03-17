import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material"
import { JSX, useState } from "react";
import Header from "./components/Header";
import { Todo } from "./types/Todo";
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";

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
          <NewTodo onCreateTodo={addNewTodo} />
          <TodoList todos={todos} onUpdateTodo={updateTodo} onDeleteTodo={deleteTodo} />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App

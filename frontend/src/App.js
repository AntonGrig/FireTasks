import React from 'react';
import TodoList from './Todo';
import './App.css';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container maxWidth="sm">
      <TodoList />
    </Container>
  );
}

export default App;

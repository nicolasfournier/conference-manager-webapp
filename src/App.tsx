//import React from "react";
//import type { Schema } from "../amplify/data/resource";
//import { generateClient } from "aws-amplify/data";
//import { Authenticator } from "@aws-amplify/ui-react";
//import "@aws-amplify/ui-react/styles.css";
//import NavigationBar from "./UI/NavigationBar";
import ConferenceLogo from "./UI/ConferenceLogo";
//import { BrowserRouter } from "react-router-dom";

import { NavigationBarReact } from './UI/NavigationBarReact';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Overview } from './UI/Pages/Overview';
import { Programme } from './UI/Pages/Programme';
import { Venue } from './UI/Pages/Venue';
//import { Link, NavLink } from "react-router-dom";
import ResponsiveAppBar from "./UI/ResponsiveAppBar";
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

//const client = generateClient<Schema>();


function App() {
  return (
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Material UI Create React App example in TypeScript
          </Typography>
          text 
        </Box>
      </Container>
  );
}
export default App;


/*
//based on https://coderspacket.com/posts/building-a-dynamic-navigation-bar-with-react/
  //  const [mystate, setMystate] = React.useState('');
     <ResponsiveAppBar />

    <AppBar position="static">
      logo
    </AppBar>


      return (
      <>
        <BrowserRouter>
      <ConferenceLogo />
      <NavigationBarReact />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/programme" element={<Programme />} />
        <Route path="/venue" element={<Venue />} />
      </Routes>

        </BrowserRouter>
      </>
      );
 
 
      function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
                {todo.content}
              </li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
*/

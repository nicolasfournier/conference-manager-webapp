//import { useEffect, useState } from "react";
//import type { Schema } from "../amplify/data/resource";
//import { generateClient } from "aws-amplify/data";
//import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

type itemType={title: string,author:string,year:number,number_reviews:number,stars:number,id:number};
//const client = generateClient<Schema>();
const testdata:itemType[] =
  [
    {
      title: 'random Title 1',
      author: 'frodo',
      year: 1750,
      number_reviews: 3,
      stars: 4,
      id: 31,
    },
    {
      title: 'random Title 2',
      author: 'bilbo',
      year: 1770,
      number_reviews: 40,
      stars: 5,
      id: 20,
    },
  ];

function itemlayout(item:itemType) {
  return (<li> title {item.title} - author {item.author} </li>);
}
const List = ()=>{
  return (<ul> {testdata.map((item)=>itemlayout(item))}</ul>);
}

function App() {
  return (
  <div>
    <h1>Testpage React</h1>
    <label htmlFor="search">Search:</label>
    <input id="search" type="text"></input>
    <hr />
    <List />
  </div>);
  /*
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
*/
}

export default App;
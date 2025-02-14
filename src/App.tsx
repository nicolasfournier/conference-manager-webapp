//import { useEffect, useState } from "react";
//import type { Schema } from "../amplify/data/resource";
//import { generateClient } from "aws-amplify/data";
//import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

type bookType={title: string,author:string,url:string,year:number,number_reviews:number,stars:number,id:number};
//const client = generateClient<Schema>();

type bookListPropsType = {
  list:bookType[]; 
}

type bookPropsType = {
  //note: there can be more arguments passed originally, but only those in the propstype will be accessible
  //so the "key" might be given in the original call of the <Book /> tag, but the "key" property need not be defined in the bookPropsType
  //It is then not accessible in <Book />
  //  key: number;
  book: bookType;
}

const Book = (bookProps:bookPropsType) => {
  return (
  <li key={bookProps.book.id}> 
    <span>Title: <a href={bookProps.book.url}>{bookProps.book.title}</a></span>
    <span> - - - </span>
    <span>Author: <b>{bookProps.book.author}</b></span>
  </li>);
}

const BookList = (props:bookListPropsType) => {
  return (<ul> {props.list.map((book)=><Book key={book.id} book={book}/>)}</ul>);
}

const PageTitle = () => {
  return (
    <div>
      <h1>Testpage React</h1>
    </div>
  );
}


const SearchField = () => {
  const handleChange = (event: { target: { value: any; }; }) => {
    console.log("event");
    console.log(event);
    console.log("target");
    console.log(event.target);
    console.log("value");
    console.log(event.target.value);
  }
    return (
    <div>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={handleChange}></input>
    </div>
  );
}

function App() {
  const booklist:bookType[] =
  [
    {
      title: 'lord of the rings',
      author: 'sauron',
      url: 'https://de.wikipedia.org/wiki/Sauron',
      year: 1750,
      number_reviews: 3,
      stars: 4,
      id: 1,
    },
    {
      title: 'the hobbit',
      author: 'bilbo',
      url: 'https://de.wikipedia.org/wiki/Hobbit',
      year: 1770,
      number_reviews: 40,
      stars: 5,
      id: 2,
    },
    {
      title: 'the ring bearer',
      author: 'frodo',
      url: 'https://de.wikipedia.org/wiki/Figuren_in_Tolkiens_Welt#Frodo_Beutlin',
      year: 1790,
      number_reviews: 4,
      stars: 4.5,
      id: 3,
    },
  ];
  return (
  <div>
    <PageTitle />
    <SearchField />
    <hr />
    <BookList list={booklist} />
  </div>);
}
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

  function App() {
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

export default App;
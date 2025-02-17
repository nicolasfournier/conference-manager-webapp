import React from "react";
//import { useEffect, useState } from "react";
//import type { Schema } from "../amplify/data/resource";
//import { generateClient } from "aws-amplify/data";
//import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

//const client = generateClient<Schema>();

type Book = { title: string, author: string, url: string, year: number, number_reviews: number, stars: number, id: number }

//note: there can be more arguments passed originally, but only those in the propstype will be accessible
//so the "key" might be given in the original call of the <Book /> tag, but the "key" property need not be defined in the bookPropsType
//It is then not accessible in <Book />
//  key: number;
type BookProps = { book: Book }
const BookListItem = ({ book }: BookProps) => {
  return (
    <li key={book.id}>
      <span>Title: <a href={book.url}>{book.title}</a></span>
      <span> - - - </span>
      <span>Author: <b>{book.author}</b></span>
    </li>);
}

/*
//Version of parameter passing with object destructuring.  
// Not nice.  I don't like it much.  I don't see the advantage
type book2PropsType = { title: string, author: string, url: string, id: number }
const Book2 = ({ title, author, url, id }: book2PropsType) => {
  return (
    <li key={id}>
      <span>Title: <a href={url}>{title}</a></span>
      <span> - - - </span>
      <span>Author: <b>{author}</b></span>
    </li>);
}
*/

type BookListProps = { list: Book[] }
const BookList = ({ list }: BookListProps) => {
  return (<ul> {list.map((book) => <BookListItem key={book.id} book={book} />)}</ul>);
  //  return (<ul> {list.map((book)=><Book2 key={book.id} title={book.title}  author={book.author}  url={book.url}  id={book.id}/>)}</ul>);
}

type PageTitleProps = { title: string }
const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

type SearchProps = { searchTerm:string, onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void }
const SearchField = ({ searchTerm, onSearchChange }: SearchProps) => {
  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" value={searchTerm} onChange={onSearchChange}></input>
    </div>
  );
}

function App() {
  const booklist: Book[] =
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
  const [searchState, setSearchState] = React.useState(localStorage.getItem('searchTerm') || 'ring');
  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchState(event.target.value);
  }
  //we could have updated the stored state ouselves at every callback
  //but instead we tie the update to any change to the searchState React-state variable
  //whenever that variable gets updated, the provided function is called, inthis case a side-effect
  //this ensures that even when the state variable gets updated in another callback, for some other
  //reason, the side-effect still gets executed 
  React.useEffect(
    ()=>{localStorage.setItem('searchTerm', searchState);},
    [searchState]
  );

  //the filteredBooks get reevaluated at each refresh of the DOM, despite being a const.
  const filteredBooks = booklist.filter((book) => { return book.title.toLowerCase().includes(searchState.toLowerCase()) });
  const previousSearchTerm=localStorage.getItem('searchTerm');
  return (
    <div>
      <PageTitle title="React Testpage Title" />
      <SearchField searchTerm={searchState} onSearchChange={searchChangeHandler} />
      <hr />
      <BookList list={filteredBooks} />
    </div>);
}

export default App;
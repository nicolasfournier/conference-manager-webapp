import React from "react";
//import { useEffect, useState } from "react";
//import type { Schema } from "../amplify/data/resource";
//import { generateClient } from "aws-amplify/data";
//import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

//const client = generateClient<Schema>();

type BookType = { title: string, author: string, url: string, year: number, number_reviews: number, stars: number, id: number }

//note: there can be more arguments passed originally, but only those in the propstype will be accessible
//so the "key" might be given in the original call of the <Book /> tag, but the "key" property need not be defined in the bookPropsType
//It is then not accessible in <Book />
//  key: number;
type BookPropsType = { book: BookType }
const Book = ({ book }: BookPropsType) => {
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

type BookListPropsType = { list: BookType[] }
const BookList = ({ list }: BookListPropsType) => {
  return (<ul> {list.map((book) => <Book key={book.id} book={book} />)}</ul>);
  //  return (<ul> {list.map((book)=><Book2 key={book.id} title={book.title}  author={book.author}  url={book.url}  id={book.id}/>)}</ul>);
}

type PageTitlePropsType = { title: string }
const PageTitle = ({ title }: PageTitlePropsType) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

type SearchPropsType = { onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void }
const SearchField = ({ onSearch }: SearchPropsType) => {
  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={onSearch}></input>
    </div>
  );
}

function App() {
  const booklist: BookType[] =
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
  const [searchState, setSearchState] = React.useState('');
  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchState(event.target.value);
  }

  const filteredBooks = booklist.filter((book) => { return book.title.toLowerCase().includes(searchState.toLowerCase()) });

  return (
    <div>
      <PageTitle title="React Testpage Title" />
      <SearchField onSearch={searchChangeHandler} />
      <hr />
      <BookList list={filteredBooks} />
    </div>);
}

export default App;
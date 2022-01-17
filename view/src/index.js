import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from "./routes/home";
import Books from "./routes/books";
import Authors from './routes/authors';
import Genres from './routes/genres';
import BookInstances from './routes/bookinstances';
import CreateBook from './routes/create_book';
import CreateAuthor from './routes/create_author';
import CreateBookInstance from './routes/create_bookinstance';
import CreateGenre from './routes/create_genre';
// element={<Books />}
// <Navigate to = 'catalog/book/create'/>
// element={<main style={{ padding: "1rem" }}> <p>There's nothing here!</p> </main>}
// <App />
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<App />} >
          <Route path="catalog" element={<Home />} />
          <Route path="catalog/books" element={<Books />} />
          <Route path="catalog/authors" element={<Authors />} />
          <Route path="catalog/genres" element={<Genres />} /> 
          <Route path="catalog/bookinstances" element={<BookInstances />} />
          <Route path="catalog/book/create" element={<CreateBook />} />
          <Route path="catalog/author/create" element={<CreateAuthor />} />
          <Route path="catalog/bookinstance/create" element={<CreateBookInstance />} />
          <Route path="catalog/genre/create" element={<CreateGenre />} />
          <Route path="*" element={<main style={{ padding: "1rem" }}> <p>There's nothing here!</p> </main>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

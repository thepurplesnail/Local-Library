import {Route, Routes, Link} from "react-router-dom";
import Books from './menus/books';
import Authors from './menus/authors';
import Genres from './menus/genres';
import BookInstances from './menus/bookinstances';
import Welcome from './welcome';
import CreateBook from './forms/create_book';
import CreateAuthor from './forms/create_author';
import CreateGenre from './forms/create_genre';
import CreateBookInstance from './forms/create_bookinstance';
import BookDetails from './details/book_details'
import GenreDetails from './details/genre_details'
import AuthorDetails from './details/author_details'

export default function Sidebar() {
    return (
      <div>
        <div className = 'sidebar'>
          <ul className = 'no-bullets'>
            <li><Link to="/catalog" className = "text-decoration-none">Home</Link></li>
            <li><Link to="/catalog/books" className = "text-decoration-none">All Books</Link></li>
            <li><Link to="/catalog/authors" className = "text-decoration-none">All Authors</Link></li>
            <li><Link to="/catalog/genres" className = "text-decoration-none">All Genres</Link></li>
            <li><Link to="/catalog/bookinstances" className = "text-decoration-none">All Book-Instances</Link></li>
            <p style = {{height: '3px', width: '8vw', margin: '.2rem', backgroundColor: 'mediumslateblue'}}></p>
            <li><Link to="/catalog/book/create" className = "text-decoration-none">Create New Book</Link></li>
            <li><Link to="/catalog/author/create" className = "text-decoration-none">Create New Author</Link></li>
            <li><Link to="/catalog/genre/create" className = "text-decoration-none">Create New Genre</Link></li>
            <li><Link to="/catalog/bookinstance/create" className = "text-decoration-none">Create New Instance (Copy)</Link></li>
          </ul>
        </div>
        <Routes>
          <Route path = '/' element = {<Welcome/>}/>
          <Route path = '/books/' element = {<Books/>}/>
          <Route path = '/authors' element = {<Authors/>}/>
          <Route path = '/genres' element = {<Genres/>}/>
          <Route path = '/bookinstances' element = {<BookInstances/>}/>
          <Route path = '/book/create' element = {<CreateBook/>}/>
          <Route path = '/author/create' element = {<CreateAuthor/>}/>
          <Route path = '/genre/create' element = {<CreateGenre/>}/>
          <Route path = '/bookinstance/create' element = {<CreateBookInstance/>}/>
          <Route path = '/book/:id' element = {<BookDetails/>}/>
          <Route path = '/genre/:id' element = {<GenreDetails/>}/>
          <Route path = '/author/:id' element = {<AuthorDetails/>}/>
          <Route path="*" element={<main style={{ padding: "1rem" }}> <p>There's nothing here!</p> </main>} />
        </Routes>
      </div>
        
    );
  }

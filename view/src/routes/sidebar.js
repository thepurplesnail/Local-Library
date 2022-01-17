import {Route, Routes, Link} from "react-router-dom";
import Books from "./books";
import Authors from './authors';
import Genres from './genres';
import BookInstances from './bookinstances';
import Welcome from './welcome';
import CreateBook from './create_book';
import CreateAuthor from './create_author';
import CreateGenre from './create_genre';
import CreateBookInstance from './create_bookinstance';

export default function Sidebar() {
    return (
      <div>
        <div className = 'row'>
          <div className = 'col-sm-2'>
            <ul className = 'sidebar-nav' className = 'no-bullets'>
              <li><Link to="/catalog" className = "text-decoration-none">Home</Link></li>
              <li><Link to="/catalog/books" className = "text-decoration-none">All Books</Link></li>
              <li><Link to="/catalog/authors" className = "text-decoration-none">All Authors</Link></li>
              <li><Link to="/catalog/genres" className = "text-decoration-none">All Genres</Link></li>
              <li><Link to="/catalog/bookinstances" className = "text-decoration-none">All Book-Instances</Link></li>
              <hr/>
              <li><Link to="/catalog/book/create" className = "text-decoration-none">Create New Book</Link></li>
              <li><Link to="/catalog/author/create" className = "text-decoration-none">Create New Author</Link></li>
              <li><Link to="/catalog/genre/create" className = "text-decoration-none">Create New Genre</Link></li>
              <li><Link to="/catalog/bookinstance/create" className = "text-decoration-none">Instance (Copy)</Link></li>
            </ul>
          </div>
        </div>
        <Routes>
          <Route path = '/' element = {<Welcome/>}/>
          <Route path = '/books' element = {<Books/>}/>
          <Route path = '/authors' element = {<Authors/>}/>
          <Route path = '/genres' element = {<Genres/>}/>
          <Route path = '/bookinstances' element = {<BookInstances/>}/>
          <Route path = '/book/create' element = {<CreateBook/>}/>
          <Route path = '/author/create' element = {<CreateAuthor/>}/>
          <Route path = '/genre/create' element = {<CreateGenre/>}/>
          <Route path = '/bookinstance/create' element = {<CreateBookInstance/>}/>
        </Routes>
      </div>
        
    );
  }
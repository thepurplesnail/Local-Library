import './App.css';
import {Outlet, Link} from "react-router-dom";

function App() {
  return (
    <div id = "App" className = 'container-fluid'>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
      </head>
      <body>
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
      </body>
      <Outlet/>
    </div>
  );
}

export default App;

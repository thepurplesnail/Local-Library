import './App.css';
import {Outlet, Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import Sidebar from './routes/sidebar';

function App() {
  return (
    <div id = "App" className = 'container-fluid'>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
      </head>
      <body>
        <BrowserRouter>
          <Routes>
            <Route path="/" element = {<Navigate to = "/catalog" />} />
            <Route path="/catalog/*" element={<Sidebar />} />
            <Route path="*" element={<main style={{ padding: "1rem" }}> <p>There's nothing here!</p> </main>} />
          </Routes>
        </BrowserRouter>

      </body>
      <Outlet/>
    </div>
  );
}

export default App;

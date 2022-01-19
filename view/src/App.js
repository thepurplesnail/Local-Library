import './App.css';
import {Outlet, Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import Sidebar from './components/sidebar';
import React, {useState, useEffect} from 'react';

function App() {
  return (
    <div id = "App" className = 'container-fluid'>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
      </head>
      <body>
        <BrowserRouter>
          <Routes>
            <Route path="*" element = {<Navigate to = "/catalog/*" />} />
            <Route path="/" element = {<Navigate to = "/catalog" />} />
            <Route path="/catalog/*" element={<Sidebar/>} />
          </Routes>
        </BrowserRouter>
      </body>
      <Outlet/>
    </div>
  );
}

export default App;

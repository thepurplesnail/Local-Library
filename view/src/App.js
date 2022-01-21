import './App.css';
import {Outlet, Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import Sidebar from './components/sidebar';
import React, {useState, useEffect} from 'react';

function App() {
  return (
    <div id = "App" className = 'container-fluid'>
        <BrowserRouter>
          <Routes>
            <Route path="*" element = {<Navigate to = "/catalog/*" />} />
            <Route path="/" element = {<Navigate to = "/catalog" />} />
            <Route path="/catalog/*" element={<Sidebar/>} />
          </Routes>
        </BrowserRouter>
      <Outlet/>
    </div>
  );
}

export default App;

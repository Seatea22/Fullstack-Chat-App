import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Users />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
        </Routes>
    </BrowserRouter>
  )
}

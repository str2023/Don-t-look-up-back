// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import { IntroPage, LoginPage, RegisterPage, MainPage } from '.';

function App() {
  

  return (
    <Router>
        <Header />
        {/* <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/main" element={<MainPage />} />
        </Routes> */}
    </Router>
  );
}

export default App;
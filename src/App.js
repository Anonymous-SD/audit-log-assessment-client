import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import FormComponent from "./components/FormComponent/FormComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormComponent/>} />
        <Route path="/site/:id" element={<FormComponent/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

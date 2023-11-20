import { useState } from "react";
import { Routes as Router, Route } from "react-router-dom";
import "./App.css";
import RootLayout from "./Layouts/RootLayout";
import HomePage from "./Pages/HomePage";
import Interpretation from "./Pages/InterpretationPage";
function App() {
  return (
    <RootLayout>
      <Router>
        <Route path="/" element={<HomePage />} />
        <Route path="/interpretaion" element={<Interpretation />} />
      </Router>
    </RootLayout>
  );
}

export default App;

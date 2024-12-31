// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Introduction from "./assets/components/Introduction"
import Prediction from "./assets/components/Prediction";
import ContactUs from "./assets/components/ContactUs";

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: "10px", background: "#f0f0f0" }}>
          <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
          <Link to="/prediction" style={{ margin: "0 10px" }}>Prediction</Link>
          <Link to="/contact" style={{ margin: "0 10px" }}>Contact Us</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./views/Home";
import Country from "./views/Country";
import Saved from "./views/Saved";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<Country />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </Router>
  );
}

export default App;

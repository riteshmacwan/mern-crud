import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
const List = import("../components/List.js");

export default function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/list" Component={List} />
      </Routes>
    </Router>
  );
}

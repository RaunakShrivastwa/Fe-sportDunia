import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./component/User/Register.jsx";
import Dashboard from "./component/Dashboard/Dashboard.jsx";
import SignIn from "./component/Auth/SignIn.jsx";

const App = () => {
  return (
    <div className="vh-100 vw-100">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register/user" element={<Register />} />
          <Route path="/user/login" element={<SignIn />}  />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const history = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Example: Add your authentication logic here
      try{
        if (formData.email && formData.password) {
            const body = formData;
            const token = await axios.post(
              "http://localhost:5000/api/users/login",body
            );

            const decodedUser = jwtDecode(token.data); // Decode the token
            console.log(decodedUser);
            Cookies.set("user", JSON.stringify(decodedUser), { expires: 1 });
            Cookies.set("token", JSON.stringify(token.data), { expires: 1 });
            history('/');
            
        } else {
          alert("Please fill in all fields!");
        }

      }catch(err){
        console.log("There is Error",err);
        
      }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow">
      <h2 className="mb-4 text-center">Login</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  );
};

export default SignIn;

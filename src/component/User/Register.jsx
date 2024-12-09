import React, { useState } from "react";
import axios from "axios";

export const Register = () => {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [referredBy,setRefer] = useState(null);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const body = {
            name,email,password,referredBy
        }
        try{
            const user = await axios.post(
              "http://localhost:5000/api/users/register",body
            );

            console.log(user.data);
            
        }catch(err){
            console.log("There is Error",err);
            
        }
    }
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center flex-column position-relative">
      <h2 className="position-absolute top-0 shadow p-2 mt-2 rounded">
        User Registration
      </h2>
      <div className="shadow container w-75 p-2">
        <form onSubmit={handleSubmit}>
          {/* name */}
          <div class="mb-3 container">
            <label for="exampleInputEmail1" class="form-label">
              Full Name
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby="emailHelp"
            />
          </div>

          {/* email */}
          <div class="mb-3 container">
            <label for="exampleInputEmail1" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div class="mb-3 container">
            <label for="exampleInputEmail1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="name"
              name="referredBy"
              aria-describedby="emailHelp"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* referred By */}
          <div class="mb-3 container">
            <label for="exampleInputEmail1" class="form-label">
              referredBy
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="referredBy"
              aria-describedby="emailHelp"
              value={referredBy}
              onChange={(e) => setRefer(e.target.value)}
            />
          </div>

          <button type="submit" class="btn btn-danger mx-3 px-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

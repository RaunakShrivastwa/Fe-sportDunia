import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { io } from "socket.io-client"; // Import Socket.IO client
import "./Dsb.css";

const Dashboard = () => {
  const cookie = Cookies.get("user");
  const tokenCookie = Cookies.get("token");

  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const [liveEarnings, setLiveEarnings] = useState(0); // Earnings tracking
  const [temp, setTemp] = useState();

  useEffect(() => {
    const load = async () => {
      try {
        const { _id } = JSON.parse(cookie);
        const userData = await axios.get(
          `http://localhost:5000/api/users/single/user/${_id}`
        );
        setUser(userData.data);
        setLiveEarnings(userData.data.earnings);
      } catch (err) {
        console.log("There is Error");
      }
    };
    if (cookie && tokenCookie) {
      load();
      setToken(JSON.parse(tokenCookie));
      console.log("user", user);
    }
  }, []);

  const socketIo = io("http://localhost:5000", {
    query: {
      token: token, // optional token for authentication
    },
    withCredentials: true,
  });

  useEffect(() => {
    if (cookie) {
      const d = JSON.parse(cookie);
      socketIo.on("direct", (data) => {
        console.log("Earnings update received:", data);
        if (d?._id == data.userId) {
          setLiveEarnings((prevEarnings) => prevEarnings + data?.earnings);
        }
      });

      socketIo.on("indirect", (data) => {
        console.log("Earnings update received:", data);
        if (d?._id == data.userId) {
          setLiveEarnings((prevEarnings) => prevEarnings + data?.earnings);
        }
      });
    }
    socketIo.on("connect", () => {
      console.log("Socket connected:", socketIo.id);
    });

    socketIo.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    return () => {
      socketIo.disconnect(); // Clean up the socket connection on unmount
    };
  }, [token]);

  const products = [
    { name: "Smartphone", price: 1200 },
    { name: "Laptop", price: 45000 },
    { name: "Smartwatch", price: 2000 },
    { name: "Gaming Console", price: 20000 },
    { name: "Portable Charger", price: 850 },
  ];

  const BuyNow = async (amount) => {
    const body = {
      userId: user?._id,
      amount: amount,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/earnings/purchase",
        body,
        {
          headers: {
            Authorization: `${token}`, // Send token in Authorization header
          },
        }
      );
    } catch (err) {
      console.error("Error during purchase:", err);
    }
  };

  return (
    <div className="vh-100 vw-100 overflow-hidden">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Dashboard
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex" role="search">
              <strong className="mt-1 me-5">{user?.email || "Guest"}</strong>
              <p className="mt-1">Live Earnings: ₹{liveEarnings}</p>
            </form>
          </div>
        </div>
      </nav>
      <div className="h-100 overflow-y-auto grid_con p-3">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((p, index) => (
            <div className="col" key={index}>
              <div className="card">
                <img
                  src={`https://via.placeholder.com/150?text=${p.name}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text d-flex gap-3">
                    <span>₹{p.price}</span>
                    <button
                      className="btn btn-danger px-2"
                      onClick={() => BuyNow(p.price)}
                    >
                      Purchase
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

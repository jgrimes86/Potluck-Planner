import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Login from "./Login";
// import EventMenu from "./EventMenu";
// import AddFamily from "./AddFamily";
// import Event from "./Event"; 
import FoodImage from "./Food.png";

import { Outlet, useLocation, useNavigate } from "react-router-dom";


function App() {
  const [user, setUser] = useState(null);
  const [event, setEvent] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()
  const location = useLocation();

  // console.log(user)

  useEffect(() => {
    fetch("http://localhost:5555/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {setUser(user); setIsLoggedIn(true)});
      }
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/events");
    } else {
      navigate("/login")
    }
  }, [isLoggedIn])

  function handleLogin(user) {
    setUser(user);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    fetch("http://localhost:5555/logout").then((r) => {
      if (r.ok) {
        setUser(null);
        setIsLoggedIn(false)
      }
    });
  }

  const context = {
    handleLogin,
    handleLogout,
    setEvent,
    event,
    setUser,
    setIsLoggedIn
  }

  return (
    <div>
      <header>
        <img src={FoodImage} alt="Food" />
      </header>
      <h1 className="title">POTLUCK PLANNER</h1>
      <Outlet context={context} />
      {(isLoggedIn && location.pathname === "/events") ? <button onClick={handleLogout}>Log Out</button> : null}
    </div>
  )
}

export default App;

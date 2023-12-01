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
  const [invitedFamily, setInvitedFamily] = useState([])

  const navigate = useNavigate()
  const location = useLocation();

  console.log(invitedFamily)

  useEffect(() => {
    fetch("http://localhost:5555/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {setUser(user); setIsLoggedIn(true)});
      }
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5555/family_members/'+event.id)
    .then(r => {
        if (r.ok) {
            r.json().then(data => setInvitedFamily(data))
        }
    })
}, [event])

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/events");
    } else {
      navigate("/login")
    }
  }, [isLoggedIn])

  // function handleLogin() {
  //   // setUser(user);
  //   setIsLoggedIn(true);
  // }

  function handleLogout() {
    fetch("http://localhost:5555/logout").then((r) => {
      if (r.ok) {
        setUser(null);
        setIsLoggedIn(false)
      }
    });
  }

  const context = {
    // handleLogin,
    handleLogout,
    setEvent,
    event,
    setUser,
    setIsLoggedIn,
    invitedFamily,
    setInvitedFamily
  }

  return (
    <div>
      <header>
        <h1 className = "Loginheader">POTLUCK</h1>
        <img src={FoodImage} alt="Food" />
        <h1 className = "Loginheader">PLANNER</h1>
      </header>
      <Outlet context={context} />
      {(isLoggedIn && location.pathname === "/events") ? <button onClick={handleLogout}>Log Out</button> : null}
    </div>
  )
}

export default App;

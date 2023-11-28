import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import EventMenu from "./EventMenu";
import Login from "./Login";
import Event from "./Event";
import ManageGuests from "./ManageGuests";

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5555/check_session")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogin(user) {
    setUser(user)
  }
  console.log('User: ', user)

  function handleLogout() {
    fetch('http://localhost:5555/logout')
    .then((r) => {
      if (r.ok) {
        setUser(null)
      }
    })
  }

  if (user) {
    return (
      <>
        <EventMenu />
        <Event />
        <ManageGuests />
        <button onClick={handleLogout}>Log Out</button>
      </>
    )
  } else {
    return <Login handleLogin={handleLogin} />
  }
}

export default App;

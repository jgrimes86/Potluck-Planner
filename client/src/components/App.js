import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import EventMenu from "./EventMenu";
import Login from "./Login";
import Event from "./Event";

function App() {
  const [user, setUser] = useState(null)

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

  return (
    <>
      <Login handleLogin={handleLogin} />
      <EventMenu />
      <Event />
      <button onClick={handleLogout}>Log Out</button>
    </>
  )

}

export default App;

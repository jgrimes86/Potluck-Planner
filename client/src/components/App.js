import React, { useEffect, useState } from "react";
import { Outlet, Switch, Route } from "react-router-dom";

// import EventMenu from "./EventMenu";
import Login from "./Login";
// import Event from "./Event";

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

  const context = {
    user
  }

  if (user) {
    return (
      <div>
        <Outlet context={context} />
        <button onClick={handleLogout}>Log Out</button>
      </div>
    )
  } else {
    return <Login handleLogin={handleLogin} />
  }


  // if (user) {
  //   return (
  //     <>
  //       <EventMenu />
  //       <Event />
  //       <button onClick={handleLogout}>Log Out</button>
  //     </>
  //   )
  // } else {
  //   return <Login handleLogin={handleLogin} />
  // }

  // const context = {
  //   handleLogin,
  //   handleLogout,
  //   setUser
  // }

  // return (
  //   <Outlet context={context} />
  // )

}

export default App;

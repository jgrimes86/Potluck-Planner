import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import EventMenu from "./EventMenu";
import AddFamily from "./AddFamily";
import Event from "./Event"; 
import FoodImage from "./Food.png";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5555/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    fetch("http://localhost:5555/logout").then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Router>
      <div>
        <header>
          <img src={FoodImage} alt="Food" />
        </header>
        <h1 className="title">POTLUCK PLANNER</h1>

        <nav>
          {user && (
            <>
              <Link to="/event-menu">Event Menu</Link>
              <Link to="/add-family">Add Family</Link>
              <Link to="/event">Event</Link>
              <button onClick={handleLogout}>Log Out</button>
            </>
          )}
        </nav>

        <Switch>
          <Route path="/event-menu">
            <EventMenu />
          </Route>
          <Route path="/add-family">
            <AddFamily />
          </Route>
          <Route path="/event/:id" component={Event} />{" "}
          {/* New route for Event component */}
          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/">
            {/* the "user ?" below is rendering EventMenu only when a user is logged in! */}
            {user ? (
              <>
                <EventMenu />
                <button onClick={handleLogout}>Log Out</button>
              </>
            ) : (
              <Login handleLogin={handleLogin} />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

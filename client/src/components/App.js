import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import EventMenu from "./EventMenu";
import Login from "./Login";
import Event from "./Event";

function App() {
  return (
    <>
      <Login />
      <EventMenu />
      <Event />
    </>
  )

}

export default App;

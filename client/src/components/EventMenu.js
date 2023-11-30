import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Outlet, Navigate, useNavigate } from "react-router-dom";


function EventMenu() {
  const [events, setEvents] = useState([]);
  

  useEffect(() => {
    fetch("http://localhost:5555/events")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Invalid data format received from the server:", data);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleDelete = (id) => {
    fetch("http://localhost:5555/events/" + id, {
      method: "DELETE"
    })
    .then (r => {
        if (r.ok) {setEvents(events.filter(event => {
          if(event.id !== id ) return event
        }))}
    })
  }

  return (
    <div>
      <h1>Event Menu</h1>
      <ul>
        {events.map((event) => (
          // Use Link to make each event clickable and navigate to the Event page
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>{event.name}</Link>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventMenu;

//create form in this EventMenuJS. For the event itself, get the name
//of the event, find a way to get the logged-in user's ID and set it
//to the organizer's ID

//You should be using a get request to get all of the events
// that the organizer has created

//turn the rendered event into a button that sends .

//make the clicked-on event save in state in app

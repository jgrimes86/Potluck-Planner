import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddEvent from "./AddEvent";


function EventMenu() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events")
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
    const shouldDelete = window.confirm("Are you sure you want to delete this event?");
  
    if (shouldDelete) {
      fetch("/events/" + id, {
        method: "DELETE"
      })
        .then(r => {
          if (r.ok) {
            setEvents(events.filter(event => event.id !== id));
          }
        })
        .catch(error => console.error("Error deleting event:", error));
    }
  }

  return (
    <div>
      <h1>Event Menu</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>{event.name}</Link>
            <button
              className="deletebutton"
              onClick={() => handleDelete(event.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <AddEvent setEvents={setEvents} events={events} />
    </div>
  );
}

export default EventMenu;


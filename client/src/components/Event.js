import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import FoodForm from "./FoodForm";
import FoodItem from "./FoodItem";
import Navbar from "./Navbar";

function Event() {
  const { id } = useParams();
  // const [event, setEvent] = useState(null);
  const [foods, setFoods] = useState([]);
  const { event, setEvent, setIsLoggedIn, setUser } = useOutletContext()

  // console.log("EVENT: ", event)
  console.log("Foods:", foods)

  useEffect(() => {
    fetch(`http://localhost:5555/events/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
      })
      .catch((error) => console.error("Error fetching event details:", error));

    fetch(`http://localhost:5555/foods?event_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
      })
      .catch((error) =>
        console.error("Error fetching associated foods:", error)
      );
  }, []);

  function handleDeleteFood(foodId) {
    fetch(`http://localhost:5555/foods/${foodId}`, {
      method: "DELETE",
    })
    .then(r => {
      if (r.ok) {
        setFoods(foods.filter(food =>{
          if (food.id !== foodId) return food
        }))
      }
    })
    .catch((error) => console.error("Error deleting food:", error));
  }

  function handleChangeFood(foodId, food) {
    fetch(`http://localhost:5555/foods/${foodId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": food
      })
    })
    .then(r => {
      if (r.ok) {
        r.json().then(updatedFood => {
          setFoods(foods.map(food => {
            if (food.id === updatedFood.id) {
              return updatedFood
            } else return food
          }))
        })
      }
    })
    .catch((error) => console.error("Error changing food:", error));
  }

  function handleNewFood(newFood) {
    setFoods([...foods, newFood])
  }


  const foodList = foods.map(food => {
      if (food) {
        return <FoodItem key={food.id} food={food} handleDeleteFood={handleDeleteFood} handleChangeFood={handleChangeFood} />
      }
    })
  
  return (
    <div>
      <Navbar event={event} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
      {event? <h1>{event.name}</h1> : null}
      <FoodForm eventId={id} handleNewFood={handleNewFood} />

      <h2>Foods:</h2>
      <ul>
        {event ? foodList : <div>Loading...</div>}
      </ul>
    </div>
  );

  
}

export default Event;


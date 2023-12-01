import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import FoodForm from "./FoodForm";
import FoodItem from "./FoodItem";
import Navbar from "./Navbar";

function Event() {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const { event, setEvent, setIsLoggedIn, setUser, invitedFamily } = useOutletContext()


  useEffect(() => {
    fetch(`/events/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
      })
      .catch((error) => console.error("Error fetching event details:", error));

    fetch(`/foods?event_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
      })
      .catch((error) =>
        console.error("Error fetching associated foods:", error)
      );
  }, []);

  function handleDeleteFood(foodId) {
    fetch(`/foods/${foodId}`, {
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
    fetch(`/foods/${foodId}`, {
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

      <h3 className = "organizingtagline">You're currently planning...</h3>


      {event? <h1 className = "selectedevent">{event.name}</h1> : null}

      <h3 className = "assignfoodstagline">Assign Some Foods to Your Guests!</h3>

      <ul id="food-table">
        {event ? foodList : <div>Loading...</div>}
      </ul>

      <h3>Add Additional Food Assignment for a Guest:</h3>
      <FoodForm eventId={id} handleNewFood={handleNewFood} foods={foods} />

    </div>
  );

  
}

export default Event;


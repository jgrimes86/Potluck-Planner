
import { useState, useEffect } from "react"

function FoodItem({food, handleDeleteFood, handleChangeFood}) {
    const [changeForm, setChangeForm] = useState(false)
    const [foodState, setFoodState] = useState(food.name)

    function handleSubmit(event) {
        event.preventDefault()
        handleChangeFood(food.id, foodState)
        setChangeForm(false)
    }

    const addFoodForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input type="text" value={foodState ? foodState : ""} onChange={handleChange} />
                <button type="submit">Add Food</button>
            </form>
        )
    }

    const foodUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input type="text" value={foodState ? foodState : ""} onChange={handleChange} />
                <button type="submit">Update Food</button>
            </form>
        )
    }

    const changeFoodButton = () => {
        return <button onClick={() => setChangeForm(true)}>Change Food</button>
    }

    function handleChange(event) {
        setFoodState(event.target.value)
    }

    function changeFoodFunctions() {
        return (
            <>
                {changeForm ? foodUpdateForm() : changeFoodButton()}
                <button onClick={() => handleDeleteFood(food.id)}>Delete Food</button>
            </>
        )
    }
 
    const bringingFood = () =>{
        return (
            <>
                <span>{food.family_member_name} will bring </span>
                <span style={{color: "#218838"}}>{foodState}</span>
            </>
        )
    }

    const notBringingFood = () => {
        return (
            <>
                <span>{food.family_member_name} isn't bringing </span>
                <span style={{color: "rgb(153, 77, 50)"}}>anything</span>
            </>
        )
    }

    return (
        <li key={food.id} className="food-item">
            <div className="guest-food">
                {food.name ? bringingFood() : notBringingFood()}
            </div>

            {/* <div className="guest-food">
                {food.name ? `${food.family_member_name} will bring ${foodState}` : `${food.family_member_name} isn't bringing anything`}
            </div> */}
            <div className="change-delete">
                {food.name ? changeFoodFunctions() : addFoodForm()}
            </div>
        </li>
    )
}

export default FoodItem



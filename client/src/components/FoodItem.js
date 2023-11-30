
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
 
    return (
        <li key={food.id} class="food-item">
            <div class="guest-food">
                {food.name ? `${food.family_member_name} will bring ${foodState}` : `${food.family_member_name} isn't bringing anything`}
            </div>
            <div class="change-delete">
                {food.name ? changeFoodFunctions() : addFoodForm()}
            </div>
        </li>
    )
}

export default FoodItem



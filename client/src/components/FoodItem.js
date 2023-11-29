
import { useState } from "react"

function FoodItem({food, handleDeleteFood, handleChangeFood}) {
    const [changeForm, setChangeForm] = useState(false)
    const [foodState, setFoodState] = useState(food.name)

    console.log(food.name)

    const changeFoodButton = () => {
        return <button onClick={() => setChangeForm(true)}>Change Food</button>
    }

    function handleChange(event) {
        setFoodState(event.target.value)
    }

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

    return (
        <li key={food.id}>
            {/* {food.name} - Family Member: {food.family_member_name} */}
            {food.family_member_name} will bring: {foodState ? foodState : addFoodForm()}
            {changeForm ? foodUpdateForm() : changeFoodButton()}
            <button onClick={() => handleDeleteFood(food.id)}>
                Delete Food
            </button>
        </li>
    )
}

export default FoodItem



import React from "react";
import { useFormik } from "formik";

function FoodForm({ eventId, handleNewFood, foods }) {


    const formik = useFormik({
        initialValues: {
            foodName: "",
            familyMemberId: "",
        },
        onSubmit: (values) => {
            fetch("/foods", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    foodName: values.foodName,
                    familyMemberId: values.familyMemberId,
                    eventId: eventId,
                }),
            })
            .then((response) => {
                if (response.ok) {
                    response.json().then(newFood => handleNewFood(newFood))
                }
            })
            .catch((error) => console.error("Error adding new food:", error));
        },
    });

    return (
        <form id="add-food-container" onSubmit={formik.handleSubmit}>
            <label id="foodName-label" htmlFor="foodName">Food Name:</label>
            <input
                type="text"
                id="foodName"
                className="input"
                name="foodName"
                onChange={formik.handleChange}
                value={formik.values.foodName}
            />

            <label id="familyMemberId-label" htmlFor="familyMemberId">Select Family Member:</label>
            <select className = "dropdown"
                id="familyMemberId"
                name="familyMemberId"
                onChange={formik.handleChange}
                value={formik.values.familyMemberId}
            >
                <option value="">Select a Family Member</option>
                {foods.map((food) => (
                    <option key={food.id} value={food.id}>
                        {food.family_member_name}
                    </option>
                ))}
            </select>

            <button id="add-food-button" type="submit">Submit</button>
        </form>
    );
}

export default FoodForm;

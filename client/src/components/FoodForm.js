import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

function FoodForm({ eventId }) {
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/family_members")
      .then((response) => response.json())
      .then((data) => {
        setFamilyMembers(data);
      })
      .catch((error) => console.error("Error fetching family members:", error));
  }, []);

  const formik = useFormik({
    initialValues: {
      foodName: "",
      familyMemberId: "",
    },
    onSubmit: (values) => {
      fetch("http://localhost:5555/foods", {
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
        .then((response) => response.json())
        .then((data) => {
          console.log("New food added:", data);
        })
        .catch((error) => console.error("Error adding new food:", error));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="foodName">Food Name:</label>
      <input
        type="text"
        id="foodName"
        name="foodName"
        onChange={formik.handleChange}
        value={formik.values.foodName}
      />

      <label htmlFor="familyMemberId">Select Family Member:</label>
      <select
        id="familyMemberId"
        name="familyMemberId"
        onChange={formik.handleChange}
        value={formik.values.familyMemberId}
      >
        <option value="">Select a Family Member</option>
        {familyMembers.map((familyMember) => (
          <option key={familyMember.id} value={familyMember.id}>
            {familyMember.first_name} {familyMember.last_name}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FoodForm;

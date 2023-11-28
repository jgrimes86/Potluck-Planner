
import {useFormik} from "formik";
import * as yup from "yup";

function ManageGuests() {


    const addGuestSchema = yup.object().shape({
        firstName: yup.string().required("Must enter a first name").max(15),
        lastName: yup.string().required("Must enter a last name").max(15),
        email: yup.string().email("Invalid email"),
    })

    const addGuestFormik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
        },
        validationSchema: addGuestSchema,
        validateOnChange: false,
        onSubmit: values => {
            fetch('http://localhost:5555/foods', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    r.json().then(user => console.log(user))
                }
            })
        },
    })

    return (
        <div>
            <h1>Manage Guests</h1>
            <div>
            <h2>Add Guests</h2>
            <form onSubmit={addGuestFormik.handleSubmit}>
                <label htmlFor="firstName">Enter First Name:</label>
                <input 
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={addGuestFormik.values.firstName}
                    onChange={addGuestFormik.handleChange}
                />
                <p style={{color: "red"}}>{addGuestFormik.errors.firstName}</p>

                <label htmlFor="lastName">Enter Last Name:</label>
                <input 
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={addGuestFormik.values.lastName}
                    onChange={addGuestFormik.handleChange}
                />
                <p style={{color: "red"}}>{addGuestFormik.errors.lastName}</p>

                <label htmlFor="email">Enter Email:</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={addGuestFormik.values.email}
                    onChange={addGuestFormik.handleChange}
                />
                <p style={{color: "red"}}>{addGuestFormik.errors.email}</p>

                <button type="submit">Submit</button>
            </form>

            </div>
        </div>
    )
}

export default ManageGuests
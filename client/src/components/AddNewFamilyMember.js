import { useOutletContext } from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";

function AddNewFamilyMember({addToJoinTable}) {

    const {invitedFamily, setInvitedFamily} = useOutletContext()

    // form for add family member to event
    const addFamilySchema = yup.object().shape({
        firstName: yup.string().required("Must enter a first name").max(15),
        lastName: yup.string().required("Must enter a last name").max(15),
        email: yup.string().email("Invalid email"),
    })

    const addFamilyFormik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validationSchema: addFamilySchema,
        validateOnChange: false,
        onSubmit: values => {
            fetch('http://localhost:5555/family_members', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.ok) {
                    r.json().then(familyMember => {
                        addToJoinTable(familyMember);
                        setInvitedFamily([...invitedFamily, familyMember])
                        addFamilyFormik.resetForm()
                    })
                }
            })
        },
    })

    // // create new foods table row to link event and family_member
    // function link_event_and_family_member(familyMember) {
        
    //     fetch('http://localhost:5555/foods', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         // MUST GET EVENT ID FROM EVENT
    //         body: JSON.stringify({
    //             family_member_id: familyMember.id,
    //             event_id: 2
    //         })
    //     })
    // }

    return (
        <div>
            <h3>Invite Family Member:</h3>
            <form onSubmit={addFamilyFormik.handleSubmit}>
                <label htmlFor="firstName">Enter First Name:</label>
                <input 
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={addFamilyFormik.values.firstName}
                    onChange={addFamilyFormik.handleChange}
                />
                <p style={{color: "red"}}>{addFamilyFormik.errors.firstName}</p>

                <label htmlFor="lastName">Enter Last Name:</label>
                <input 
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={addFamilyFormik.values.lastName}
                    onChange={addFamilyFormik.handleChange}
                />
                <p style={{color: "red"}}>{addFamilyFormik.errors.lastName}</p>

                <label htmlFor="email">Enter Email:</label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={addFamilyFormik.values.email}
                    onChange={addFamilyFormik.handleChange}
                />
                <p style={{color: "red"}}>{addFamilyFormik.errors.email}</p>

                <button type="submit">Submit</button>
            </form>
        </div>
    )

}

export default AddNewFamilyMember
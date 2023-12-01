import { useFormik } from "formik";
import * as yup from "yup";

function AddEvent({setEvents, events}){

    const formikSchema = yup.object().shape({
        event: yup.string().required("Must enter an event"),
      });
    
    const formik = useFormik({
    initialValues: {
        event: "",
    },
    validationSchema: formikSchema,
    onSubmit: (values) => {
        fetch("/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
        }).then((r) => {
        if (r.ok) {
            r.json().then((newEvent) => setEvents([...events,newEvent]));
        }
        });
    },
    });

    
    return(
    
    <div>

        <h3>New Event Form</h3>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="event"></label>
            <input name="event" type="text" value={formik.values.event} onChange={formik.handleChange}/>
            <button type="submit">Create Event</button>
        </form>

    </div>

    
    )

}

export default AddEvent
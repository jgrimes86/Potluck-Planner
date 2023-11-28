
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

const initialState ={
    status: "pending",
    error: null
}

function Event() {
    const {user} = useOutletContext();
    const [state, setState] = useState(initialState)

    useEffect(() => {
        setState(initialState);
        let user_id
        if (user) {
            user_id = user.id
        } else {
            user_id = 0
        }
        fetch('http://localhost:5555/check_session/'+user_id)
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setState({status: "resolved", error: null});
                })
            } else {
                r.json().then(error => {
                    setState({status: "rejected", error: error.message})
                })
            }
        })
    }, [])

    if (state.status === "pending") return <h1>Loading...</h1>;

    if (state.status === "rejected") return <h1>{state.error}</h1>

    return (
        <h1>Event</h1>
    )

}

export default Event
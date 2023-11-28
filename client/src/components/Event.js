
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

const initialState ={
    status: "pending",
    error: null
}

function Event() {
    const {setUser} = useOutletContext();
    const [state, setState] = useState(initialState)

    useEffect(() => {
        setState(initialState);
        fetch('http://localhost:5555/check_session')
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setState({status: "resolved", error: null});
                    setUser(user)
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

import { NavLink } from "react-router-dom";

function Navbar({event, setUser, setIsLoggedIn}) {


    return (
        <nav>
            <NavLink
                to="/events"
            >
                Event Menu
            </NavLink>
            <NavLink
                to={`/event/${event.id}`}
            >
                Event
            </NavLink>
            <NavLink
                to={`/familymembers/${event.id}`}
            >
                Family Members
            </NavLink>
            <NavLink
                to="/login"
                onClick={() => {setIsLoggedIn(false); setUser(null)}}
            >
                Log Out
            </NavLink>
        </nav>
    )
}

export default Navbar

import { NavLink } from "react-router-dom";

function Navbar({event, setUser, setIsLoggedIn}) {


    return (
        <nav>
            <NavLink end 
                to="/events"
            >
                Event Menu
            </NavLink>
            <NavLink end
                to={`/events/${event.id}`}
            >
                Event
            </NavLink>
            <NavLink end
                to={`/events/familymembers/${event.id}`}
            >
                Family Members
            </NavLink>
            <NavLink end
                to="/login"
                onClick={() => {setIsLoggedIn(false); setUser(null)}}
            >
                Log Out
            </NavLink>
        </nav>
    )
}

export default Navbar
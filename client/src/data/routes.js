
import Login from "../components/Login";
import EventMenu from "../components/EventMenu";
import Event from "../components/Event";
import AddFamily from "../components/AddFamily";
import App from "../components/App";



const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/events",
                element: <EventMenu />,
            },

            {
                path: "/event/:id",
                element: <Event />
            },
            {
                path: "/familymembers/:id",
                element: <AddFamily />
            }
                
            
        ]
    },
]

export default routes

import { createBrowserRouter } from "react-router-dom";
import App from "../components/App";
import Login from "../components/Login";
import EventMenu from "../components/EventMenu";
import Event from "../components/Event";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/events",
                element: <EventMenu />,
            },
            {
                path: "/event",
                element: <Event />
            }
        ]
    }
]);

export default router;
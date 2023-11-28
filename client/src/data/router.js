import { createBrowserRouter } from "react-router-dom";
import App from "../components/App";
import EventMenu from "../components/EventMenu";
import Event from "../components/Event";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
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
import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import router from "./data/router";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={router} />);

import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

import Layout from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
import SearchResults from "./Pages/SearchResults.jsx";
import PlantDetails from "./Pages/PlantDetails.jsx";
import IdentificationPage from "./Pages/Identify.jsx";
import About from "./Pages/About.jsx";
import AllPlants from "./Pages/Plants.jsx";

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/search",
                element: <SearchResults />,
            },
            {
                path: "/plant/:id",
                element: <PlantDetails />,
            },
            {
                path: "/identify",
                element: <IdentificationPage />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/all-plants",
                element: <AllPlants />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

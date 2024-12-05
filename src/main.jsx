import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CreateBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import App from "./App.jsx";

const router = CreateBrowserRouter([]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeToggleProvider } from "./ThemeContext.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeToggleProvider>
            <App />
        </ThemeToggleProvider>
      </BrowserRouter>
    </Provider>
);

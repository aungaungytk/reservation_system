import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/index.scss";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/features/Store";
import { QueryClientProvider } from "react-query";
import { queryClient } from './query/queryClient';
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
        <Router>
          <App/>
        </Router>
        </QueryClientProvider>
      </Provider>
    </DarkModeContextProvider>
  </React.StrictMode>
);

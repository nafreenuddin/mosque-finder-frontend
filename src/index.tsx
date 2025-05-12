// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppRoutes from "./routes";
import { store } from "./app/store";

import Layout from "./components/Layout";

const theme = createTheme({
  palette: {
    primary: { main: "#00796B" },
    secondary: { main: "#FFC107" },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Layout>
            <AppRoutes />
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import RoutersConfig from "./config/RoutersConfig";
import { createTheme } from "@mui/material";
import { colorPrimary } from "./values/Colors";
import { ThemeProvider } from "@emotion/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    primary: {
      main: colorPrimary,
    },
    white: {
      main: "#fff",
    },
    cinav: {
      main: "#000",
    },
  },
});

root.render(
  <React.StrictMode>
    
      <ThemeProvider theme={theme}>
        <RoutersConfig />
      </ThemeProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

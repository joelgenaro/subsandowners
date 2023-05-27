import React from "react";
import Routes from "./Routes/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
import "./assets/scss/themes.scss";

axios.defaults.baseURL = process.env.REACT_APP_DEV_SERVER_URL;
// axios.defaults.baseURL = process.env.REACT_APP_PRD_SERVER_URL;

function App() {
  return (
    <React.Fragment>
      <CookiesProvider>
        <Routes />
      </CookiesProvider>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;

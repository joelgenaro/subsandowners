import React from "react";
import Routes from "./Routes/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
//import Custom Style scss
import "./assets/scss/themes.scss";
let react_env = process.env.REACT_APP_NODE_ENV;
let node_url = "http://localhost:5000";
if (react_env == "production") {
  node_url = process.env.REACT_APP_SERVER_URL;
}
axios.defaults.baseURL = node_url;

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

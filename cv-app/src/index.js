import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HelmetProvider } from "react-helmet-async";


const root = ReactDOM.createRoot(document.getElementById("root"));



 root.render(
  <HelmetProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </HelmetProvider>
);

// root.render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <App />
//   </Provider>
//   // </React.StrictMode>
// );



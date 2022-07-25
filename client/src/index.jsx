import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthState } from "./context/authProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthState>
      <App />
    </AuthState>
  </StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom";
// ReactDOM.render(
//   <React.StrictMode>
//     <AuthState>
//       <App />
//     </AuthState>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

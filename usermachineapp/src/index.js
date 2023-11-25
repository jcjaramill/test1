import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Routes/Login";
import Home from "./Routes/Home";
import Logout from "./Routes/Logout";
import HomeAuth from "./Routes/HomeAuth";
import UsersCanguro500 from "./Routes/UsersCanguro500";
import UsersCanguro1200 from "./Routes/UsersCanguro1200";
import UsersFETTE2 from "./Routes/UsersFETTE2";
import UsersFETTE4 from "./Routes/UsersFETTE4";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/*<Route path='/' element={<Layout/>}>*/}

      <Route index element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="homeAuth" element={<HomeAuth />} />
      <Route path="logout" element={<Logout />} />
      <Route path="UsersCanguro500" element={<UsersCanguro500 />} />
      <Route path="UsersCanguro1200" element={<UsersCanguro1200 />} />
      <Route path="UsersFETTE2" element={<UsersFETTE2 />} />
      <Route path="UsersFETTE4" element={<UsersFETTE4 />} />

      <Route
        path="*"
        element={
          <div className="container">
            <h1>404-Not found</h1>
          </div>
        }
      />

      {/*</Route>*/}
    </Routes>
  </BrowserRouter>,
  
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

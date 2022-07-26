import "./Admin.css";
import SideMenu, { menuItems } from "./components/SideMenu";

import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Reservation from "./components/Reservation";
import Customers from "./components/Customers";
import Rooms from "./components/Rooms";
import Dashboard from "./components/Dashboard";
import Payments from "./components/Payments";

const Admin = () => {
  const [inactive, setInactive] = useState(false);
  return (
    <div className="Admin">
          <SideMenu
            onCollapse={(inactive) => {
              console.log(inactive);
              setInactive(inactive);
            }}
          />
          <div className={`container ${inactive ? "inactive" : ""}`}>
          <Routes>
              <Route exact path="/dashboard" element={<Dashboard/>}/>
              <Route exact path="/reservation" element={<Reservation/>}/>
              <Route exact path="/customers" element={<Customers/>}/>
              <Route exact path="/rooms" element={<Rooms/>}/>
              <Route exact path="/payments" element={<Payments/>}/>
          </Routes>
          </div>
    </div>
  );
};

export default Admin;

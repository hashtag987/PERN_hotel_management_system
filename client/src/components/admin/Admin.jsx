import "./Admin.css";
import SideMenu, { menuItems } from "./components/SideMenu";

import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Reservation from "./components/Reservation";
import Customers from "./components/Customers";
import Rooms from "./components/Rooms";
import Dashboard from "./components/Dashboard";

const Admin = ({DOMAIN}) => {
  const [inactive, setInactive] = useState(false);
  return (
    <div className="Admin">
          <SideMenu
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
          />
          <div className={`container ${inactive ? "inactive" : ""}`}>
          <Routes>
              <Route exact path="/dashboard" element={<Dashboard DOMAIN={DOMAIN}/>}/>
              <Route exact path="/reservation" element={<Reservation DOMAIN={DOMAIN}/>}/>
              <Route exact path="/customers" element={<Customers DOMAIN={DOMAIN}/>}/>
              <Route exact path="/rooms" element={<Rooms DOMAIN={DOMAIN}/>}/>
          </Routes>
          </div>
    </div>
  );
};

export default Admin;

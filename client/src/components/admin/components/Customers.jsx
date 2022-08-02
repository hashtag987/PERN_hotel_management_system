import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
const Customers = ({ DOMAIN}) => {
  const navigate = useNavigate();
  if (sessionStorage["authToken"] == undefined) {
    window.location.href = window.location.origin + "/alogin";
  }
  const onLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
    window.location.href = window.location.origin + "/alogin";
  };
  const [customers, setcustomers] = useState([]);
  const getcustomers = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const res = await axios.get(DOMAIN+"/admin/getcustomers");
      // console.log(availableRooms);
      const jsonData = await res.data;
      setcustomers(jsonData);
      // console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcustomers();
  }, []);
  return (
    <div className="main-dashboard">
      <button className="adm-btn" onClick={(e) => onLogout(e)}>
      <Icon icon="ri:logout-box-line" width="20" height="20"/>
      </button>
      <h3>Customers</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cus) => (
              <tr key={cus.res_id}>
                <td>{cus.customer_id}</td>
                <td>{cus.name}</td>
                <td>{cus.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;

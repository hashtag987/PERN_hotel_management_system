import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Customers = () => {
    const navigate = useNavigate();
  if(sessionStorage["authToken"]==undefined){
    navigate("/alogin");
  }
  const onLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
    navigate("/alogin");
  } 
  const [customers, setcustomers] = useState([]);
  const getcustomers = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const res = await axios.get("http://localhost:5000/admin/getcustomers");
      // console.log(availableRooms);
      const jsonData = await res.data;
      setcustomers(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcustomers();
  }, []);
  return (
    <div className="dashboard">
        <button className="adm-btn" onClick={(e)=>onLogout(e)}>logout</button>
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
  );
};

export default Customers;

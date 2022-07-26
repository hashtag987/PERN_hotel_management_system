import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/reservation.css"
import { useNavigate } from "react-router-dom";
const Rooms = () => {
  const navigate = useNavigate();
  if (sessionStorage["authToken"] == undefined) {
    navigate("/alogin");
  }

  const onLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
    navigate("/alogin");
  } 
  const [rooms, setrooms] = useState([]);
  const getrooms = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const res = await axios.get("http://localhost:5000/admin/getrooms");
      // console.log(availableRooms);
      const jsonData = await res.data;
      setrooms(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getrooms();
  }, []);
  return (
    <div className="dashboard">
      <button>AddRoom</button>
      <button className="adm-btn" onClick={(e) => onLogout(e)}>
        logout
      </button>
      <table>
        <thead>
          <tr>
            <th>Rooms No.</th>
            <th>Class ID</th>
            <th>Class Name </th>
            <th>Vacancy</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.room_no}>
              <td>{room.room_no}</td>
              <td>{room.class_id}</td>
              <td>{room.class_name}</td>
              <td className={room.isavailable?"isvaccant":"occupied"}>{room.isavailable ? "Vacant" : "Occupied"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rooms;

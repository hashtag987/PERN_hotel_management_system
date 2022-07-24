import React, { useState, useEffect } from "react";
import "../styles/home.css";
import axios from "axios";

const Available = (props) => {
  const [rooms, setrooms] = useState([]);
  const data = props.checkin;
  const getAvailableRooms = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const availableRooms = await axios.post(
        "http://localhost:5000/user/available", data
      );
      // console.log(availableRooms);
      const jsonData = await availableRooms.data;
      setrooms(jsonData);
      // console.log(rooms.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getAvailableRooms();
  },[])
  return (
    <div className="container">
      <h2 className="available-header">Yes, We have rooms for you</h2>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Class ID</div>
          <div className="col col-2">Class Name</div>
          <div className="col col-3">Rooms Available</div>
          <div className="col col-4">Price</div>
        </li>
        {rooms.map((room) => (
          <li className="table-row" key={room.class_id}>
            <div className="col col-1" data-label="Job Id">
              {room.class_id}
            </div>
            <div className="col col-2" data-label="Customer Name">
              {room.class_name}
            </div>
            <div className="col col-3" data-label="Amount">
              {room.count}
            </div>
            <div className="col col-4" data-label="Payment Status">
              {room.class_price}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Available;

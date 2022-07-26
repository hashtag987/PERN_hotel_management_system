import React, { useState, useEffect } from "react";
import "../styles/home.css";
import axios from "axios";

const Available = (props) => {
  const rooms = props.rooms;
  return (
    <div className="available-container">
      <h2 className="available-header">{rooms.length===0?"No Rooms Available":"Yes, We have rooms for you"}</h2>
      {rooms.length>0?(
        <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Class ID</div>
          <div className="col col-2">Class Name</div>
          <div className="col col-3">Rooms Available</div>
          <div className="col col-4">Price</div>
        </li>
        {rooms.map((room) => (
          <li className="table-row" key={room.id}>
            <div className="col col-1" data-label="Job Id">
              {room.id}
            </div>
            <div className="col col-2" data-label="Customer Name">
              {room.name}
            </div>
            <div className="col col-3" data-label="Amount">
              {room.roomcount}
            </div>
            <div className="col col-4" data-label="Payment Status">
              {room.price}
            </div>
          </li>
        ))}
      </ul>
      ):<div/>}
      
    </div>
  );
};

export default Available;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/reservation.css";
import { useNavigate } from "react-router-dom";
const Reservation = () => {
  const navigate = useNavigate();
  if (sessionStorage["authToken"] == undefined) {
    navigate("/alogin");
  }
  const [reservations, setreservations] = useState([]);

  const onLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
    navigate("/alogin");
  };
  const getReservations = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/getreservations"
      );
      // console.log(availableRooms);
      const jsonData = await res.data;
      setreservations(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReservations();
  }, []);
  return (
    <div className="dashboard">
      <button className="adm-btn" onClick={(e)=>onLogout(e)}>logout</button>
      <table>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Customer ID</th>
            <th>Checked In</th>
            <th>Checked Out</th>
            <th>No. of day(s)</th>
          </tr>
        </thead>
        <tbody>
            {reservations.map((reservation) => (
                <tr key={reservation.res_id}>
                    <td>{reservation.res_id}<br/>Rooms:{reservation.rooms.toString()}</td>
                    <td>{reservation.customer_id}</td>
                    <td>{reservation.date_in.substring(0,10)}</td>
                    <td>{reservation.date_out.substring(0,10)}</td>
                    <td>{reservation.date_range}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
    // <div className="available-container-admin">
    //   {/* <h2 className="available-header">
    //     {rooms.length === 0
    //       ? "No Rooms Available"
    //       : "Yes, We have rooms for you"}
    //   </h2> */}
    //   <ul className="responsive-table">
    //     <li className="table-header">
    //       <div className="col col-1">Reservation ID</div>
    //       <div className="col col-2">Customer ID</div>
    //       <div className="col col-3">Checked In</div>
    //       <div className="col col-4">Checked out</div>
    //     </li>
    //     {reservations.map((reservation) => (
    //       <li className="table-row" key={reservation.res_id}>
    //         <div className="col col-1" data-label="Job Id">
    //           {reservation.res_id}<br/>Rooms:{reservation.rooms.toString()}
    //         </div>
    //         <div className="col col-2" data-label="Customer Name">
    //           {reservation.customer_id}
    //         </div>
    //         <div className="col col-3" data-label="Amount">
    //           {reservation.date_in.substring(0,10)}
    //         </div>
    //         <div className="col col-4" data-label="Payment Status">
    //           {reservation.date_out.substring(0,10)}
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default Reservation;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/reservation.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
const Reservation = ({DOMAIN}) => {
  // console.log(sessionStorage["authToken"]);
  const navigate = useNavigate();
  useEffect(()=>{
    if (sessionStorage["authToken"] == undefined) {
      window.location.href = window.location.origin + "/alogin";
    }
  },[window.location.href])
  
  const [reservations, setreservations] = useState([]);
  const [filters, setFilters] = useState({"from_date":"","to_date":"", "customer_id":""})

  const onLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
        window.location.href = window.location.origin + "/alogin";
  };
  const getReservations = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const res = await axios.get(
        DOMAIN+"/admin/getreservations"
      );
      // console.log(availableRooms);
      const jsonData = await res.data;
      setreservations(jsonData);
      // console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear=(e)=>{
    // setFilters({});
    console.log("clear");
    e.preventDefault();
    window.location.reload();
  }

  useEffect(() => {
    getReservations();
  }, []);
  return (
    <div className="main-dashboard">
      <button className="adm-btn" onClick={(e) => onLogout(e)}>
        <Icon icon="ri:logout-box-line" width="20" height="20" />
      </button>
      <h3>Reservations</h3>
      <div className="filter-by-date">
        <TextField
          type="text"
          onFocus={(e)=> {e.target.type ="date"}}
          onBlur={(e)=> {e.target.type ="text"}}
          onChange={(e)=>{setFilters({...filters, ["from_date"]:new Date(e.target.value)})}}
          id="indate"
          label="From Date"
          variant="outlined"
          size="small"
          className="input-filter"
        />
        <TextField
          type="text"
          onFocus={(e)=> {e.target.type ="date"}}
          onBlur={(e)=> {e.target.type ="text"}}
          InputProps={{inputProps:{min:filters.from_date.length===0?"":new Date(filters.from_date.getTime() + 60 * 60 * 24 * 1000).toISOString().split("T")[0]}}}
          onChange={(e)=>{setFilters({...filters, ["to_date"]:new Date(e.target.value)})}}
          id="outdate"
          label="To Date"
          variant="outlined"
          size="small"
          className="input-filter"
        />
        <TextField
          type="number"
          id="cusid"
          label="Customer ID"
          variant="outlined"
          size="small"
          min="0"
          className="input-filter cusid"
          onChange={(e)=>{setFilters({...filters, ["customer_id"]:e.target.value})}}
        />
        <Button variant="contained" className="filter-btn" color="warning" onClick={handleClear}>Clear</Button>
      </div>
      
      <div>
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
            {reservations.filter((reservation)=>{
              return (filters.from_date.length===0 || new Date(reservation.date_in) >= filters.from_date) && (filters.to_date.length===0 || new Date(reservation.date_in) <= filters.to_date) && new String(reservation.customer_id).startsWith(filters.customer_id);
            }).map((reservation) => (
              <tr key={reservation.res_id}>
                <td>
                  {reservation.res_id}
                  <br />
                  Rooms:{reservation.rooms.toString()}
                </td>
                <td>{reservation.customer_id}</td>
                <td>{reservation.date_in.substring(0, 10)}</td>
                <td>{reservation.date_out.substring(0, 10)}</td>
                <td>{reservation.date_range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

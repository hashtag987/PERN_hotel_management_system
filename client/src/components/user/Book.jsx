import React, { useState } from "react";
import axios from "axios";
import "../styles/book.css";
import { useEffect } from "react";
const Book = () => {
  const [newCustomer, setnewCustomer] = useState(true);
  const [oldCustomer, setoldCustomer] = useState(false);
  const [data, setData] = useState({
    customerid: "",
    name: "",
    email: "",
    noofrooms: "",
    classtype: "single",
    checkin: "",
    checkout: "",
    adults: "1",
    children: "1",
  });
  const oldUser = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const adduser = await axios.post(
        "http://localhost:5000/user/old/reservation",
        data
      );
      // console.log(availableRooms);
      const jsonData = await adduser.data;
      console.log(adduser.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const newUser = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const reservation = await axios.post(
        "http://localhost:5000/user/new/reservation",
        data
      );
      const jsonData = await reservation.data;
      console.log(jsonData[0].customer_id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };

  const toggleForm = (e) => {
    e.preventDefault();
    setnewCustomer(!newCustomer);
    setoldCustomer(!oldCustomer);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="inner">
          {newCustomer && (
            <form action="" className="form" onSubmit={newUser}>
              <h3>Book a Room</h3>
              <br />
              <div className="form-row">
                <div className="form-wrapper">
                  <label for="">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="form-control"
                    // placeholder="Your Name"
                  />
                </div>
                <div className="form-wrapper">
                  <label for="">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="form-control"
                    // placeholder="Your Email"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-wrapper">
                  <label for="">Rooms</label>
                  <input
                    type="text"
                    name="noofrooms"
                    value={data.noofrooms}
                    onChange={handleChange}
                    className="form-control"
                    // placeholder="No.of"
                  />
                </div>
                <div className="form-wrapper">
                  <label for="">Class</label>
                  <select
                    name="classtype"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="triple">Triple</option>
                    <option value="quad">Quad</option>
                    <option value="cabana">Cabana</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                  <i className="zmdi zmdi-chevron-down"></i>
                </div>
              </div>
              <div className="form-row">
                <div className="form-wrapper">
                  <label for="">Check-in</label>
                  <span className="lnr lnr-calendar-full"></span>
                  <input
                    type="date"
                    name="checkin"
                    // onFocus={(e) => (e.target.type = "date")}
                    // onBlur={(e) => (e.target.type = "text")}
                    value={data.checkin}
                    onChange={handleChange}
                    dateformat="yyyy-mm-dd"
                    className="form-control datepicker-here"
                    data-language="en"
                  />
                </div>
                <div className="form-wrapper">
                  <label for="">Check-out</label>
                  <span className="lnr lnr-calendar-full"></span>
                  <input
                    type="date"
                    name="checkout"
                    // onFocus={(e) => (e.target.type = "date")}
                    // onBlur={(e) => (e.target.type = "text")}
                    value={data.checkout}
                    onChange={handleChange}
                    dateformat="yyyy-mm-dd"
                    className="form-control datepicker-here"
                    data-language="en"
                  />
                </div>
              </div>
              <div className="form-row last">
                <div className="form-wrapper">
                  <label for="">Adults</label>
                  <select
                    name="adults"
                    id=""
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                  <i className="zmdi zmdi-chevron-down"></i>
                </div>
                <div className="form-wrapper">
                  <label for="">Children</label>
                  <select
                    name="children"
                    id=""
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                  <i className="zmdi zmdi-chevron-down"></i>
                </div>
              </div>
              <div className="form-row last">
                <div className="form-wrapper">
                  <button data-text="Book Room" className="book-btn">
                    <span>Book Room</span>
                  </button>
                </div>
                <div className="form-wrapper">
                  <u><p onClick={(e)=>toggleForm(e)}>Already a customer in our hotel?</p></u>
                </div>
              </div>
            </form>
          )}
          {oldCustomer && (
            <form action="" className="form" onSubmit={oldUser}>
              <h3>Welcome Back</h3>
              <br />
              <div className="form-row">
                <div className="form-wrapper">
                  <label for="">Customer ID *</label>
                  <input
                    type="text"
                    name="customerid"
                    value={data.customerid}
                    onChange={handleChange}
                    className="form-control old"
                    // placeholder="Your Name"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-wrapper">
                  <label for="">Rooms</label>
                  <input
                    type="text"
                    name="noofrooms"
                    value={data.noofrooms}
                    onChange={handleChange}
                    className="form-control"
                    // placeholder="No.of"
                  />
                </div>
                <div className="form-wrapper">
                  <label for="">Class</label>
                  <select
                    name="classtype"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="triple">Triple</option>
                    <option value="quad">Quad</option>
                    <option value="cabana">Cabana</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                  <i className="zmdi zmdi-chevron-down"></i>
                </div>
              </div>
              <div className="form-row">
                <div className="form-wrapper">
                  <label for="">Check-in</label>
                  <span className="lnr lnr-calendar-full"></span>
                  <input
                    type="date"
                    name="checkin"
                    // onFocus={(e) => (e.target.type = "date")}
                    // onBlur={(e) => (e.target.type = "text")}
                    value={data.checkin}
                    onChange={handleChange}
                    dateformat="yyyy-mm-dd"
                    className="form-control datepicker-here"
                    data-language="en"
                  />
                </div>
                <div className="form-wrapper">
                  <label for="">Check-out</label>
                  <span className="lnr lnr-calendar-full"></span>
                  <input
                    type="date"
                    name="checkout"
                    // onFocus={(e) => (e.target.type = "date")}
                    // onBlur={(e) => (e.target.type = "text")}
                    value={data.checkout}
                    onChange={handleChange}
                    dateformat="yyyy-mm-dd"
                    className="form-control datepicker-here"
                    data-language="en"
                  />
                </div>
              </div>
              <div className="form-row last">
                <div className="form-wrapper">
                  <label for="">Adults</label>
                  <select
                    name="adults"
                    id=""
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                  <i className="zmdi zmdi-chevron-down"></i>
                </div>
                <div className="form-wrapper">
                  <label for="">Children</label>
                  <select
                    name="children"
                    id=""
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                  <i className="zmdi zmdi-chevron-down"></i>
                </div>
              </div>
              <div className="form-row last">
                <div className="form-wrapper">
                  <button data-text="Book Room" className="book-btn">
                    <span>Book Room</span>
                  </button>
                </div>
                <div className="form-wrapper">
                  <u><p onClick={(e)=>toggleForm(e)}>New to our Hotel?</p></u>
                </div>
              </div>
            </form>
          )}
        </div>
        <div className="inner-right">
          <div className="inner-slogan">
            <span>W</span>here luxury meets comfort <i>to</i> give you the
            perfect vacation
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;

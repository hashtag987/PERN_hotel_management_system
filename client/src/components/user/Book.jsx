import React, { useState } from "react";
import axios from "axios";
import "../styles/book.css";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Book = ({ DOMAIN }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newCustomer, setnewCustomer] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    customerid: "",
    name: "",
    email: "",
    noofrooms: "1",
    classtype: new URL(window.location.href).searchParams.get("roomtype"),
    checkin: new Date().toISOString().split("T")[0],
    checkout: new Date(new Date().getTime() + 60 * 60 * 24 * 1000)
      .toISOString()
      .split("T")[0],
    adults: "1",
    children: "0",
  });

  const [info, setInfo] = useState([]);
  useEffect(() => {
    handleClassChange(data.classtype);
  }, [window.location.href]);

  const generateError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });
  const oldUser = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const response = await axios.post(DOMAIN + "/user/old/reservation", data);
      setInfo(response.data);
      console.log(info.data);
      setOpen(true);
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        generateError(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };

  const newUser = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const response = await axios.post(DOMAIN + "/user/new/reservation", data);
      setInfo(response.data);
      setOpen(true);
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        generateError(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleDateChange = (e) => {
    let input = e.target;
    setData({
      ...data,
      [input.name]: input.value,
      ["checkout"]: new Date(
        new Date(input.value).getTime() + 60 * 60 * 24 * 1000
      )
        .toISOString()
        .split("T")[0],
    });
  };

  const handleClassChange = async (value) => {
    setData({ ...data, ["classtype"]: value });
  };

  const toggleForm = (e) => {
    e.preventDefault();
    setnewCustomer(!newCustomer);
  };

  return (
    <div>
      <div className="wrapper">
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Booking Information
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Customer Id:{info.customerid}<br/>
                Rooms: {info.data?.toString()}<br/>
              </Typography>
            </Box>
          </Modal>
        </div>
        <div className="inner">
          <form action="" className="form" onSubmit={newCustomer?newUser:oldUser}>
            {newCustomer ? (
              <>
                <h3>Book a Room</h3>
                <br />
                <div className="form-row">
                  <div className="form-wrapper">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3>Welcome Back</h3>
                <br />
                <div className="form-row">
                  <div className="form-wrapper">
                    <label htmlFor="">Customer ID *</label>
                    <input
                      type="text"
                      name="customerid"
                      value={data.customerid}
                      onChange={handleChange}
                      className="form-control old"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="form-row">
              <div className="form-wrapper">
                <label htmlFor="">Rooms</label>
                <input
                  type="number"
                  name="noofrooms"
                  id=""
                  min="1"
                  defaultValue="1"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-wrapper">
                <label htmlFor="">Class</label>
                <select
                  name="classtype"
                  className="form-control"
                  onChange={(e) => handleClassChange(e.target.value)}
                >
                  <option value="single" selected={data.classtype == "single"}>
                    Single
                  </option>
                  <option value="double" selected={data.classtype == "double"}>
                    Double
                  </option>
                  <option value="triple" selected={data.classtype == "triple"}>
                    Triple
                  </option>
                  <option value="quad" selected={data.classtype == "quad"}>
                    Quad
                  </option>
                  <option value="cabana" selected={data.classtype == "cabana"}>
                    Cabana
                  </option>
                  <option value="villa" selected={data.classtype == "villa"}>
                    Villa
                  </option>
                  <option
                    value="penthouse"
                    selected={data.classtype == "penthouse"}
                  >
                    Penthouse
                  </option>
                </select>
                <i className="zmdi zmdi-chevron-down"></i>
              </div>
            </div>
            <div className="form-row">
              <div className="form-wrapper">
                <label htmlFor="">Check-in</label>
                <span className="lnr lnr-calendar-full"></span>
                <input
                  type="date"
                  name="checkin"
                  min={new Date().toISOString().split("T")[0]}
                  value={data.checkin}
                  onChange={handleDateChange}
                  dateformat="yyyy-mm-dd"
                  className="form-control datepicker-here"
                  data-language="en"
                />
              </div>
              <div className="form-wrapper">
                <label htmlFor="">Check-out</label>
                <span className="lnr lnr-calendar-full"></span>
                <input
                  type="date"
                  name="checkout"
                  min={
                    new Date(
                      new Date(data.checkin).getTime() + 60 * 60 * 24 * 1000
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                  value={data.checkout}
                  onChange={(e) => {
                    setData({ ...data, ["checkout"]: e.target.value });
                  }}
                  dateformat="yyyy-mm-dd"
                  className="form-control datepicker-here"
                  data-language="en"
                />
              </div>
            </div>
            <div className="form-row last">
              <div className="form-wrapper">
                <label htmlFor="">Adults</label>
                <input
                  min="1"
                  type="number"
                  name="adults"
                  defaultValue="1"
                  id=""
                  className="form-control"
                  onChange={handleChange}
                />
                <i className="zmdi zmdi-chevron-down"></i>
              </div>
              <div className="form-wrapper">
                <label htmlFor="">Children</label>
                <input
                  min="0"
                  type="number"
                  name="children"
                  id=""
                  defaultValue="0"
                  className="form-control"
                  onChange={handleChange}
                />
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
                <u>
                  <p onClick={(e) => toggleForm(e)}>
                    Already a customer in our hotel?
                  </p>
                </u>
              </div>
            </div>
          </form>
        </div>
        <div className="inner-right">
          <div className="inner-slogan">
            <span>W</span>here luxury meets comfort <i>to</i> give you the
            perfect vacation
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Book;

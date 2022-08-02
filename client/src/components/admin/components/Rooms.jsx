import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/reservation.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, MenuItem } from "@mui/material";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";

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
const Rooms = ({ DOMAIN }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage["authToken"] == undefined) {
      window.location.href = window.location.origin + "/alogin";
    }
  }, [window.location.href]);

  const generateError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

  const onLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
    window.location.href = window.location.origin + "/alogin";
  };
  const [classes, setclasses] = useState([]);
  const getclasses = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const res = await axios.get(DOMAIN + "/classes");
      const jsonData = await res.data;
      setclasses(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  const [rooms, setrooms] = useState([]);

  const [curclass, setcurclass] = useState("single");

  const handleChange = (event) => {
    setcurclass(event.target.value);
  };
  const getrooms = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const res = await axios.get(DOMAIN + "/admin/getrooms");
      // console.log(availableRooms);
      const jsonData = await res.data;
      setrooms(jsonData);
      // console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckout = async (room_no, idx) => {
    const res = await axios.put(DOMAIN + "/admin/updateroom", {
      roomno: room_no,
    });
    if (res.status === 200) {
      setrooms([
        ...rooms.slice(0, idx),
        {
          ...rooms[idx],
          isavailable: true,
        },
        ...rooms.slice(idx + 1),
      ]);
    }
  };

  const onAddRoom = async (e) => {
    try {
      // console.log({roomno:document.getElementById("roomno").value,classtype:document.getElementById("classtype").innerText});
      const res = await axios.post(DOMAIN + "/admin/addroom", {
        roomno: document.getElementById("roomno").value,
        classtype: document.getElementById("classtype").innerText,
      });
      if (res.status == 200) {
        getrooms();
        handleClose();
      }
    } catch (error) {
      generateError(error.response.data.message);
    }
  };

  const onDeleteRoom = async (room_no, idx) => {
    const res = await axios.post(DOMAIN + "/admin/deleteroom", {
      roomno: room_no,
    });
    if (res.status == 200) {
      setrooms([...rooms.slice(0, idx), ...rooms.slice(idx + 1)]);
    }
  };
  useEffect(() => {
    getrooms();
    getclasses();
  }, []);
  return (
    <div className="main-dashboard">
      <button className="adm-btn" onClick={(e) => onLogout(e)}>
        <Icon icon="ri:logout-box-line" width="20" height="20" />
      </button>
      <h3>Rooms</h3>
      <div>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add a room
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  id="roomno"
                  label="Enter a room no"
                  variant="standard"
                  fullWidth
                />
                <br />
                <br />
                <TextField
                  id="classtype"
                  select
                  value={curclass}
                  onChange={handleChange}
                  helperText="Please select a class"
                  variant="standard"
                  fullWidth
                >
                  {classes.map((clas) => (
                    <MenuItem key={clas.class_id} value={clas.class_id}>
                      {clas.class_name}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <br />
                <Button variant="contained" fullWidth onClick={onAddRoom}>
                  Add
                </Button>
              </Typography>
            </Box>
          </Modal>
        </div>
        <Button variant="outlined" onClick={handleOpen}>
          <Icon icon="akar-icons:plus" color="#4486ff" />
          Add room
        </Button>
        {/* <Button variant="outlined" onClick={handleOpen}><Icon icon="akar-icons:plus" color="#4486ff" />Add class</Button> */}
        <table>
          <thead>
            <tr>
              <th>Rooms No.</th>
              <th>Class ID</th>
              <th>Class Name </th>
              <th>Vacancy</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, idx) => (
              <tr key={room.room_no}>
                <td>{room.room_no}</td>
                <td>{room.class_id}</td>
                <td>{room.class_name}</td>
                <td className={room.isavailable ? "isvaccant" : "occupied"}>
                  {room.isavailable ? "Vacant" : "Occupied"}
                </td>
                <td>
                  {!room.isavailable ? (
                    <Button
                      onClick={async (e) => onCheckout(room.room_no, idx)}
                      variant="contained"
                      color="error"
                      size="small"
                      className="checkout-btn"
                    >
                      Check out
                    </Button>
                  ) : (
                    <Button
                      onClick={async (e) => onDeleteRoom(room.room_no, idx)}
                      variant="contained"
                      color="error"
                      size="small"
                      className="checkout-btn"
                    >
                      Remove
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Rooms;

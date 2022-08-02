import React,{useState,useEffect} from "react";
import { Typography, Card, CardContent } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import HotelIcon from '@mui/icons-material/Hotel';
import { Icon } from "@iconify/react";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import BusinessIcon from '@mui/icons-material/Business';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Dashboard = ({ DOMAIN}) => {
  const navigate = useNavigate();
  useEffect(()=>{
    if (sessionStorage["authToken"] == undefined) {
      window.location.href = window.location.origin + "/alogin";
    }
  },[window.location.href])
  const onLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
        window.location.href = window.location.origin + "/alogin";
  };
  const [dashboard, setDashboard] = useState({
      customers:"",
      rooms:"",
      reservations:"",
      inthehouse:"",
      vacancies:"",
      roomtypes:""
  })

  const getdashboard = async(e) =>{
    try {
      const dashboardData = await axios.get(DOMAIN+"/admin/getdashboarddetails");
      // console.log(dashboardData.data);
      setDashboard(dashboardData.data);
      // console.log(dashboard);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { 
    getdashboard();
  },[])
  const style = {
    minWidth: 250,
    width: 75,
    height: 175,
    boxShadow: "0 60px 40px -30px rgba(45, 45, 45, 0.27)",
    borderRadius: 4,
  };
  return (
    <div className="main-dashboard">
      <button className="adm-btn" onClick={(e)=>onLogout(e)}><Icon icon="ri:logout-box-line" width="20" height="20"/></button>
      <h3>Dashboard</h3>
      <div className="cards">
        <Card sx={style} className="card">
          <CardContent>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold" }}
              align="center"
              color="text.secondary"
              gutterBottom
            >
              Customers
            </Typography>
            <div className="card-sub-container">
              <GroupsIcon sx={{ fontSize: "4.5rem",  color:"rgba(0, 0, 0, 0.6)" }} />
              <Typography variant="body2" sx={{ fontSize: 50, color:"RGB(19, 160, 223)" }} className="card-sub-container-number" >
                {dashboard.customers}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card sx={style} className="card">
          <CardContent>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold" }}
              align="center"
              color="text.secondary"
              gutterBottom
            >
              Rooms
            </Typography>
            <div className="card-sub-container">
              <HotelIcon sx={{ fontSize: "4.5rem",  color:"rgba(0, 0, 0, 0.6)" }} />
              <Typography variant="body2" sx={{ fontSize: 50,color:"RGB(249, 137, 139)"}} className="card-sub-container-number" >
                {dashboard.rooms}
              </Typography>
            </div>
          </CardContent>
        </Card><Card sx={style} className="card">
          <CardContent>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold" }}
              align="center"
              color="text.secondary"
              gutterBottom
            >
              Reservations
            </Typography>
            <div className="card-sub-container">
              <AssignmentTurnedInIcon sx={{ fontSize: "4.5rem",  color:"rgba(0, 0, 0, 0.6)" }} />
              <Typography variant="body2" sx={{ fontSize: 50, color:"RGB(133, 39, 153)" }} className="card-sub-container-number" >
                {dashboard.reservations}
              </Typography>
            </div>
          </CardContent>
        </Card><Card sx={style} className="card">
          <CardContent>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold" }}
              align="center"
              color="text.secondary"
              gutterBottom
            >
              In the House
            </Typography>
            <div className="card-sub-container">
              <EventBusyIcon sx={{ fontSize: "4.5rem",  color:"rgba(0, 0, 0, 0.6)" }} />
              <Typography variant="body2" sx={{ fontSize: 50,color:"RGB(242, 155, 28)"}} className="card-sub-container-number" >
                {dashboard.inthehouse}
              </Typography>
            </div>
          </CardContent>
        </Card><Card sx={style} className="card">
          <CardContent>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold" }}
              align="center"
              color="text.secondary"
              gutterBottom
            >
              Vacancies
            </Typography>
            <div className="card-sub-container">
              <EventAvailableIcon sx={{ fontSize: "4.5rem",  color:"rgba(0, 0, 0, 0.6)" }} />
              <Typography variant="body2" sx={{ fontSize: 50, color:"RGB(83, 169, 85)" }} className="card-sub-container-number" >
                {dashboard.vacancies}
              </Typography>
            </div>
          </CardContent>
        </Card><Card sx={style} className="card">
          <CardContent>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold" }}
              align="center"
              color="text.secondary"
              gutterBottom
            >
              Room Types
            </Typography>
            <div className="card-sub-container">
              <BusinessIcon sx={{ fontSize: "4.5rem",  color:"rgba(0, 0, 0, 0.6)" }} />
              <Typography variant="body2" sx={{ fontSize: 50,color:"RGB(21, 165, 231)" }} className="card-sub-container-number" >
                {dashboard.roomtypes}
              </Typography>
            </div>
          </CardContent>
        </Card> 
      </div>
    </div>
  );
};

export default Dashboard;

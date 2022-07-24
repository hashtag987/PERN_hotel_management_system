import React from "react";
import { styles } from "../styles/alogin.css";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const ALogin = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  //   const navigate = useNavigate();

  const generateError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/adminlogin";
      const { data: res } = await axios.post(url, data);
      //localStorage.setItem("token", res.data);
      //window.location = "/";
      //navigate("/board");
      console.log("success");
    } catch (error) {
      console.log(error.response.data.message);
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
  return (
    <div className="main-admin">
      <div className="box-form">
        <div className="inner-box">
          {/* <img src={logger} className="carousel-login" /> */}
          <div className="forms-wrap-login" onSubmit={handleSubmit}>
            <form className="form-horizontal">
              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    value={data.username}
                    required
                  />
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    className="input-field"
                    autocomplete="off"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                  />
                </div>
                <input type="submit" value="Sign In" className="sign-btn" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ALogin;

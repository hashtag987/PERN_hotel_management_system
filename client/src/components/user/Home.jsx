import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import cus1 from "../styles/images/cus1.jpg";
import cus2 from "../styles/images/cus2.jpg";
import Available from "./Available";
import axios from "axios";

const Home = ({ DOMAIN }) => {
  const [dates, setDates] = useState({
    checkin: new Date().toISOString().split("T")[0],
    checkout: new Date(new Date().getTime() + 60 * 60 * 24 * 1000)
      .toISOString()
      .split("T")[0],
  });
  const [rooms, setrooms] = useState([]);
  const [activeNav, setactiveNav] = useState(false);
  const [available, setavailable] = useState(false);
  const [classes, setclasses] = useState([]);
  const toggeleNav = (e) => {
    e.preventDefault();
    setactiveNav(!activeNav);
  };

  const toggleAvail = (e) => {
    e.preventDefault();
    getAvailableRooms(e);
  };

  const handleChange = ({ currentTarget: input }) => {
    setDates({
      checkin: input.value,
      checkout: new Date(new Date(input.value).getTime() + 60 * 60 * 24 * 1000)
        .toISOString()
        .split("T")[0],
    });
  };

  const getClasses = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const allclasses = await axios.get(DOMAIN + "/classes");
      const jsonData = await allclasses.data;
      setclasses([...jsonData]);
    } catch (error) {
      console.log(error);
    }
  };
  const getAvailableRooms = async (e) => {
    try {
      const availablerooms = await axios.post(
        DOMAIN + "/user/available",
        dates
      );
      const jsonData = await availablerooms.data.data;
      setrooms([...jsonData]);
      setavailable(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);
  return (
    <div className="main-container">
      {/* <!-- header --> */}
      <header className="header" id="header">
        <div className="head-top">
          <div className="site-name">Froyo Grande</div>
          <div className="site-nav" onClick={(e) => toggeleNav(e)}>
            <Icon icon="eva:menu-fill" height="40" />
          </div>
        </div>

        <div className="head-bottom flex">
          <h2>NICE AND COMFORTABLE PLACE TO STAY</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto est
            quos veniam impedit numquam itaque voluptatum, dicta asperiores
            accusamus, eligendi neque ut incidunt, modi harum molestiae atque
            natus officia minima.
          </p>
          <button type="button" className="head-btn">
            GET STARTED
          </button>
        </div>
      </header>
      {/* <!-- end of header -->

        <!-- side navbar --> */}
      <div className={!activeNav ? "sidenav" : "sidenav show"} id="sidenav">
        <span
          className="cancel-btn"
          id="cancel-btn"
          onClick={(e) => toggeleNav(e)}
        >
          <Icon icon="ep:close-bold" height="20" />
        </span>

        <ul className="navbar">
          <li>
            <a href="#header">home</a>
          </li>
          <li>
            <a href="#services">services</a>
          </li>
          <li>
            <a href="#rooms">rooms</a>
          </li>
          <li>
            <a href="#customers">customers</a>
          </li>
        </ul>
        <button className="btn sign-up">sign up</button>
        <button className="btn log-in">
          <Link to="/alogin">Log in</Link>
        </button>
      </div>
      {/* <!-- end of side navbar --> */}

      {/* <!-- fullscreen modal --> */}
      <div id="modal"></div>
      {/* <!-- end of fullscreen modal --> */}

      {/* <!-- body content  --> */}
      <section className="services sec-width" id="services">
        <div className="title">
          <h2>services</h2>
        </div>
        <div className="services-container">
          <article className="service">
            <div className="service-content">
              <Icon icon="fluent:food-24-filled" height="40" />
              <h2>Food Service/ Food Runner</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias blanditiis tempore officia accusamus asperiores. Illum
                maxime eligendi necessitatibus laudantium iste nisi pariatur
                doloremque ut illo similique voluptatum enim distinctio
                perferendis, ad ipsam aspernatur omnis rem autem ex, reiciendis
                corporis suscipit!
              </p>
              <button type="button" className="btn">
                Know More
              </button>
            </div>
          </article>
          <article className="service">
            <div className="service-content">
              <Icon icon="fa-solid:swimming-pool" height="40" />
              <h2>Refreshment</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias blanditiis tempore officia accusamus asperiores. Illum
                maxime eligendi necessitatibus laudantium iste nisi pariatur
                doloremque ut illo similique voluptatum enim distinctio
                perferendis, ad ipsam aspernatur omnis rem autem ex, reiciendis
                corporis suscipit!
              </p>
              <button type="button" className="btn">
                Know More
              </button>
            </div>
          </article>
          <article className="service">
            <div className="service-content">
              <Icon icon="fa6-solid:broom" height="25" />
              <h2>Housekeeping</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias blanditiis tempore officia accusamus asperiores. Illum
                maxime eligendi necessitatibus laudantium iste nisi pariatur
                doloremque ut illo similique voluptatum enim distinctio
                perferendis, ad ipsam aspernatur omnis rem autem ex, reiciendis
                corporis suscipit!
              </p>
              <button type="button" className="btn">
                Know More
              </button>
            </div>
          </article>
          <article className="service">
            <div className="service-content">
              <Icon icon="wpf:security-checked" height="40" />
              <h2>Room Security</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias blanditiis tempore officia accusamus asperiores. Illum
                maxime eligendi necessitatibus laudantium iste nisi pariatur
                doloremque ut illo similique voluptatum enim distinctio
                perferendis, ad ipsam aspernatur omnis rem autem ex, reiciendis
                corporis suscipit!
              </p>
              <button type="button" className="btn">
                Know More
              </button>
            </div>
          </article>
        </div>
      </section>

      <div className="book">
        <form className="book-form">
          <div className="form-item">
            <label htmlFor="checkin-date">Check In Date: </label>
            <input
              type="date"
              name="checkin"
              min={new Date().toISOString().split("T")[0]}
              defaultValue={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              id="chekin-date"
            />
          </div>
          <div className="form-item">
            <label htmlFor="checkout-date">Check Out Date: </label>
            <input
              type="date"
              min={
                new Date(
                  new Date(dates.checkin).getTime() + 60 * 60 * 24 * 1000
                )
                  .toISOString()
                  .split("T")[0]
              }
              value={dates.checkout}
              onChange={(e) => {
                setDates({ ...dates, ["checkout"]: e.target.value });
              }}
              id="chekout-date"
            />
          </div>
          <div className="form-item">
            <label htmlFor="adult">Adults: </label>
            <input type="number" min="1" defaultValue="1" id="adult" />
          </div>
          <div className="form-item">
            <label htmlFor="children">Children: </label>
            <input type="number" min="1" defaultValue="1" id="children" />
          </div>
          <div className="form-item">
            <label htmlFor="rooms">Rooms: </label>
            <input type="number" min="1" defaultValue="1" id="rooms" />
          </div>
          <div className="form-item">
            <input
              type="submit"
              className="btn"
              value="Check"
              onClick={(e) => toggleAvail(e)}
            />
          </div>
        </form>
      </div>

      <section>
        {available && <Available checkin={dates} rooms={rooms} />}
      </section>

      <section className="rooms sec-width" id="rooms">
        <div className="title">
          <h2>rooms</h2>
        </div>
        <div className="rooms-container">
          {classes.map((clas, idx) => (
            <article className="room" key={idx}>
              <div className="room-image">
                {<img src={`${DOMAIN}/image/${clas.image}`} />}
              </div>
              <div className="room-text">
                <h3>{clas.class_name}</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus exercitationem repellendus maxime ullam tempore
                  architecto provident unde expedita quam beatae, dolore
                  eligendi molestias sint tenetur incidunt voluptas. Unde
                  corporis qui iusto vitae. Aut nesciunt id iste, cum esse
                  commodi nemo?
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  corporis quasi officiis cumque, fugiat nostrum sunt, tempora
                  animi dicta laborum beatae ratione doloremque. Delectus odio
                  sit eius labore, atque quo?
                </p>
                <p className="rate">
                  <span>${clas.class_price}.00 /</span> Per Night
                </p>
                <Link className="book-now-link" to={`/book?roomtype=${clas.class_name}`}>
                  <button type="button" className="btn">
                    Book now
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="customers" id="customers">
        <div className="sec-width">
          <div className="title">
            <h2>customers</h2>
          </div>
          <div className="customers-container">
            <div className="customer">
              <h3>We Loved it</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                beatae veritatis provident eveniet praesentium veniam cum iusto
                distinctio esse, vero est autem, eius optio cupiditate?
              </p>
              <img src={cus1} />
              <span className="cus-name">Customer Name, Country</span>
            </div>
            <div className="customer">
              <h3>Comfortable Living</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                beatae veritatis provident eveniet praesentium veniam cum iusto
                distinctio esse, vero est autem, eius optio cupiditate?
              </p>
              <img src={cus2} />
              <span className="cus-name">Customer Name, Country</span>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-container">
          <div>
            <h2>About Us </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              sapiente mollitia doloribus provident? Eos quisquam aliquid vel
              dolorum, impedit culpa.
            </p>
            <ul className="social-icons">
              <li className="flex">
                <i className="fa fa-twitter fa-2x"></i>
              </li>
              <li className="flex">
                <i className="fa fa-facebook fa-2x"></i>
              </li>
              <li className="flex">
                <i className="fa fa-instagram fa-2x"></i>
              </li>
            </ul>
          </div>

          <div>
            <h2>Useful Links</h2>
            <a href="#">Blog</a>
            <a href="#">Rooms</a>
            <a href="#">Subscription</a>
            <a href="#">Gift Card</a>
          </div>

          <div>
            <h2>Privacy</h2>
            <a href="#">Career</a>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Services</a>
          </div>

          <div>
            <h2>Have A Question</h2>
            <div className="contact-item">
              <span>
                <Icon icon="clarity:map-marker-solid" />
              </span>
              <span>
                203 Fake St.Mountain View, San Francisco, California, USA
              </span>
            </div>
            <div className="contact-item">
              <span>
                <Icon icon="bxs:phone" />
              </span>
              <span>+84545 37534 48</span>
            </div>
            <div className="contact-item">
              <Icon icon="carbon:email" />
              <span>info@domain.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import cus1 from "../styles/images/review1.jpg";
import cus2 from "../styles/images/review2.jpg";
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
            Esteemed guests are welcome to relax and unwind in a quiet and
            elegant setting in the popular resort of India and enjoy a genuine
            experience of leisure, pleasure, gastronomy and wellness within the
            premises of the resort
          </p>
          <button type="button" className="head-btn">
            GET STARTED
          </button>
        </div>
      </header>
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
            <a href="#check">check availabilty</a>
          </li>
          <li>
            <a href="#rooms">rooms</a>
          </li>
          <li>
            <a href="#customers">customers</a>
          </li>
        </ul>
        <Link to="/alogin" className="admin-login-link">
          <button className="btn log-in">Admin</button>
        </Link>
      </div>
      <div id="modal"></div>
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
                Our show kitchens and live stations add an element of theatre to
                every dining experience. A generosity of space, lofty ceilings,
                charming water bodies, an outdoor courtyard where one can dine
                under the stars, an island bar, a private dining room cloaked in
                glass and chic furnishings makes a truly welcoming area. The
                defining factor, of course, is the food.
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
                The philosophy of Jiva or “Inner Life” is inherently rooted in
                India’s ancient approach to wellness. Inspired by traditional
                Indian healing wisdom, we believe that a spa unfolds the path of
                life that opens out channels to nurture one’s life force. Jiva
                embraces a deep understanding of mind, body and spirit; their
                individual needs and their interdependences.
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
                Our hotel teams are ready to assist to help ensure the safety
                and well-being of everyone. As part of our continued efforts to
                help our guests enjoy a relaxed stay with us, our hotel can
                provide information on locally available medical assistance and
                support.Our team can advise you on the nearest pharmacies and
                stores to purchase personal protective equipment kits, masks,
                and other medical necessities.
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
                The security of our guests is our utmost priority. Our personnel
                are trained according to best global standards to conduct these
                routines with utmost sensitivity and without discrimination .
                The cooperation of our guests is highly appreciated and their
                inconvenience is regretted.Your safety, security and comfort
                remain at the heart of everything we do. Experience the
                heartfelt warmth of our signature hospitality, strengthened with
                the assurance of safety and hygiene.
              </p>
              <button type="button" className="btn">
                Know More
              </button>
            </div>
          </article>
        </div>
      </section>

      <div className="book" id="check">
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
                <p>{clas.description}</p>
                <p className="rate">
                  <span>₹{clas.class_price}.00 /</span> Per Night
                </p>
                <Link
                  className="book-now-link"
                  to={`/book?roomtype=${clas.class_name}`}
                >
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
                <i>
                  "Me and my wife checked in to Froyo Grande on our vacation. It
                  is situated right in the middle of the Downtown area and has a
                  very beautiful view of the city. We stayed in the hotel for 3
                  nights and had a very comfortable stay like home. There are
                  five restaurants and every place serves an exquisite cuisine."
                </i>
              </p>
              <img src={cus1} />
              <span className="cus-name">Ajeyan, Tiruppur</span>
            </div>
            <div className="customer">
              <h3>Comfortable Living</h3>
              <p>
                <i>
                  "Our family were extremely impressed when we stayed at Froyo Grande
                  recently.We had a wonderful stay at the hotel and
                  the two gentlemen John and Harpal you are the face of the
                  hotel. You have the greatest and amazing hospitality and the
                  staff will go all way out in making your stay enjoyable."
                </i>
              </p>
              <img src={cus2} />
              <span className="cus-name">Dharun, Coimbatore</span>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-container">
          <div>
            <h2>About Us </h2>
            <p>
              Froyo Grande is recognised the world over for delivering
              exceptional hospitality, an amalgam of world-class refinement
              inspired by the heritage and nobility of Indian traditions.
            </p>
          </div>

          <div>
            <h2>Useful Links</h2>
            <a href="#">
              <Icon icon="akar-icons:chevron-right" height="10" width="10" />
              <span> </span>Blog
            </a>
            <a href="#">
              <Icon icon="akar-icons:chevron-right" height="10" width="10" />
              <span> </span>Rooms
            </a>
            <a href="#">
              <Icon icon="akar-icons:chevron-right" height="10" width="10" />
              <span> </span>Subscription
            </a>
            <a href="#">
              <Icon icon="akar-icons:chevron-right" height="10" width="10" />
              <span> </span>Gift Card
            </a>
          </div>

          <div>
            <h2>Privacy</h2>
            <a href="#">
              <Icon icon="akar-icons:chevron-right" height="10" width="10" />
              <span> </span>Career
            </a>
            <a href="#">
              <Icon icon="akar-icons:chevron-right" height="10" width="10" />
              <span> </span>About Us
            </a>
            <a href="#">
              <Icon icon="akar-icons:chevron-right" height="10" width="10" />
              <span> </span>Contact Us
            </a>
            <a href="#">
              <Icon icon="akar-icons:chevron-right" height="10" width="10" />
              <span> </span>Services
            </a>
          </div>

          <div>
            <h2>Have A Question</h2>
            <div className="contact-item">
              <span>
                <Icon icon="clarity:map-marker-solid" />
              </span>
              <span>Coimbatore, Tamil Nadu</span>
            </div>
            <div className="contact-item">
              <span>
                <Icon icon="bxs:phone" />
              </span>
              <span>+91 9585549396</span>
            </div>
            <div className="contact-item">
              <Icon icon="carbon:email" />
              <span>sri33arun@gmail.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

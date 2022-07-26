const router = require("express").Router();
const pool = require("../db");
const crypto = require("crypto");


router.post("/adminlogin", async (req, res) => {
  try {
    const { username, password } = req.body;
    //console.log(username);
    const admins = await pool.query(
      "SELECT username FROM admins WHERE username = $1 AND password = $2",[username,password]
    );
    let data = {username: username, date:new Date()}
    const hash = crypto.createHash("sha256").update(JSON.stringify(data)).digest("base64");
    console.log(hash.toString());
    if(admins.rowCount==0){
        return res.status(404).send({ message: "Admin not found" });
    }else{
        return res.status(200).send({ message: "logged in successfully",authToken:hash });
    }
  } catch (err) {
    //console.log(err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/admin/getreservations", async (req, res) => {
  try {
    const reservation = await pool.query("SELECT * FROM reservation");
    console.log("hello");
    if (reservation.rowCount == 0) {
      res.status(404).json({ message: "No Reservations" });
    } else {
      res.status(200).json(reservation.rows);
    }
  } catch (err) {
    //console.log(err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/admin/getcustomers", async (req, res) => {
  try {
    const customers = await pool.query("SELECT * FROM customers");
    if (customers.rowCount == 0) {
      res.status(404).json({ message: "No customers" });
    } else {
      res.status(200).json(customers.rows);
    }
  } catch (err) {
    //console.log(err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/admin/getrooms", async (req, res) => {
  try {
    const rooms = await pool.query("select room_no, rooms.class_id , classes.class_name,isavailable from rooms inner join classes on classes.class_id=rooms.class_id order by room_no");
    if (rooms.rowCount == 0) {
      res.status(404).json({ message: "Error getting rooms" });
    } else {
      res.status(200).json(rooms.rows);
    }
  } catch (err) {
    //console.log(err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


module.exports = router;

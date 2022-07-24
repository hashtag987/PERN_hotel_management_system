const router = require("express").Router();
const pool = require("../db");

router.get("/available", async (req, res) => {
  try {
    const rooms = await pool.query(
      "SELECT c.class_id,class_name, count(*), class_price FROM rooms r inner join classes c on c.class_id = r.class_id WHERE r.isavailable = '1' GROUP BY c.class_id ORDER BY c.class_id"
    );
    if (rooms.rowCount == 0) {
      res.status(404).json({ message: "Rooms not Available" });
    } else {
      res.status(200).json(rooms.rows);
    }
  } catch (err) {
    //console.log(err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});



router.put("/user/updateroom", async (req, res) => {
  try {
    const { roomno } = req.body;
    const status = await pool.query(
      "select isavailable from rooms where room_no = $1",
      [roomno]
    );
    let room_stat = !status.rows[0].isavailable;
    const updateroom = await pool.query(
      "update rooms set isavailable = $1 where room_no = $2",
      [room_stat, roomno]
    );
    res.json(status.rows);
    //res.sendStatus(200).json({data: reservation.rows[0],message:"Reservation success"})
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/user/old/reservation", async (req, res) => {
  try {
    console.log(req.body)
    const { customerid,checkin, checkout,adults,children,classtype,noofrooms } = req.body;
    const rooms=[101];
    const reservation = await pool.query(
      "INSERT INTO reservation(customer_id, rooms,date_in,date_out,adults,children,noofrooms) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [customerid, rooms, checkin, checkout,adults, children,noofrooms]
    );
    res.json(reservation.rows);
    //res.sendStatus(200).json({data: reservation.rows[0],message:"Reservation success"})
  } catch (err) {
    console.log(err.message);
    res.status(501).send({ message: "Internal Server Error" });
  }
});

router.post("/user/new/reservation", async (req, res) => {
  try {
    const {email,name,checkin, checkout,adults,children,classtype,noofrooms  } = req.body;
    console.log(name);
    const usercreation = await pool.query(
      "INSERT INTO customers(name,email) VALUES($1,$2) RETURNING customer_id",
      [name,email]
    );
    const customerid = parseInt(usercreation.rows[0].customer_id);
    console.log(req.body);
    const rooms=[101];
    const reservation = await pool.query(
      "INSERT INTO reservation(customer_id, rooms,date_in,date_out,adults,children,noofrooms) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [customerid, rooms, checkin, checkout,adults, children,noofrooms]
    );
    //res.sendStatus(200).json(reservation.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/user/available", async (req, res) => {
  try {
    const rooms = await pool.query(
      "SELECT c.class_id,class_name, count(*), class_price FROM rooms r inner join classes c on c.class_id = r.class_id WHERE r.isavailable = '1' GROUP BY c.class_id ORDER BY c.class_id"
    );
    const { checkin } = req.body;
    const availablecheckin = await pool.query(
      "SELECT * FROM reservation WHERE date_in < $1",
      [checkin]
    );
    let roomIds = [];
    for (var num in availablecheckin.rows) {
      var obj = availablecheckin.rows[num];
      roomIds.push(obj.room_no);
    }
    const avail = await pool.query(
      "SELECT c.class_id,class_name, count(*), class_price FROM rooms r inner join classes c on c.class_id = r.class_id WHERE r.room_no = ANY ($1) GROUP BY c.class_id ORDER BY c.class_id",
      [roomIds]
    );

    let classIds = [];
    for (var num in avail.rows) {
      var obj = avail.rows[num];
      classIds.push({
        classid: parseInt(obj.class_id),
        count: parseInt(obj.count),
      });
    }
    console.log(rooms.rows);
    console.log(roomIds);
    console.log(classIds);

    const roomsArray = rooms.rows;
    for (var i = 0; i < classIds.length; i++) {
      for (var j = 0; j < roomsArray.length; j++) {
        if (roomsArray[j].class_id == classIds[i].class_id) {
          roomsArray[j].count += parseInt(classIds[i].count);
        }
      }
    }
    //console.log(roomsArray)
    res.json(roomsArray);
    //res.sendStatus(200).json({message:"User created successfully"})
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;

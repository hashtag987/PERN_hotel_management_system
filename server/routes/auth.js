const router = require("express").Router();
const pool = require("../db");

router.post("/adminlogin", async (req, res) => {
  try {
    const { username, password } = req.body;
    //console.log(username);
    const admins = await pool.query(
      "SELECT username FROM admins WHERE username = $1 AND password = $2",[username,password]
    );
    if(admins.rowCount==0){
        return res.status(404).send({ message: "Admin not found" });
    }else{
        return res.status(200).send({ message: "logged in successfully" });
    }
  } catch (err) {
    //console.log(err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


module.exports = router;

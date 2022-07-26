const express = require("express");
const app = express();
const cors = require("cors");
const adminRoute = require("./routes/auth");
const userRoutes = require("./routes/user");
const path = require("path");
//middleware
app.use(cors());
app.use(express.json());

app.use(adminRoute)
app.use(userRoutes);
app.use("/image", express.static(path.join(__dirname, "images")));

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
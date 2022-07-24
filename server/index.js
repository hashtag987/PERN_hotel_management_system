const express = require("express");
const app = express();
const cors = require("cors");
const adminRoute = require("./routes/auth");
const availableRoutes = require("./routes/user");
//middleware
app.use(cors());
app.use(express.json());

app.use(adminRoute)
app.use(availableRoutes);

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
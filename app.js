require("dotenv").config();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const express = require("express");
const db = require("./models/db");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//admin login api 
app.use("/auth", require("./router/admin/auth"))

app.use("/api/admin", require("./router/admin/admin"))

//event api 
app.use("/api/event", require("./router/event"))

//rsvip api
app.use("/api/rsvp", require("./router/rsvp"))

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
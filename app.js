require("dotenv").config();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const express = require("express");
const db = require("./models/db");
const app = express();

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
}

app.use(allowCrossDomain)
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
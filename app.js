//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const port = 3000;

app.set("view engine", "ejs");


app.get("/", function (req, res) {
    let today = new Date();
    let day = today.toLocaleDateString("en-US", {weekday: "long", day: "numeric", month: "long"});

    res.render("list", {kindOfDay: day});

});


app.listen(port, function () {
    console.log(`Server successfully started on port ${port}...`);

});

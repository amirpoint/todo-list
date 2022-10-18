//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
let items = ["First item", "Second item", "3nd item"];//default items

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})); 


app.get("/", function (req, res) {
    let today = new Date();
    let day = today.toLocaleDateString("en-US", {weekday: "long", day: "numeric", month: "long"});

    res.render("list", {kindOfDay: day, newListItems: items});//ejs method

});


app.post("/", function (req, res) {
    //get and push new item to the array list
    items.push(req.body.newItem);
    console.log(items[items.length-1]);
    res.redirect("/");

});


app.listen(port, function () {
    console.log(`Server successfully started on port ${port}...`);

});

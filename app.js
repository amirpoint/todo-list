//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(`${__dirname}/date.js`);//own module

const app = express();
const port = 3000;
const items = ["First item", "Second item", "3nd item"];//default items
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("list", {listTitle: date.getDate(), newListItems: items});//ejs method

});

app.get("/work", function (req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});

});


app.post("/", function (req, res) {
    //get and push new item to the specific array list
    if (req.body.btn === "Work List") {
        workItems.push(req.body.newItem);
        res.redirect("/work");

    } else {
        items.push(req.body.newItem);
        res.redirect("/");     
        
    }
    

});


app.listen(port, function () {
    console.log(`Server successfully started on port ${port}...`);

});

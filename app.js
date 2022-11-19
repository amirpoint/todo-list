//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(`${__dirname}/date.js`);//own module


const app = express();
const port = 3000;
//Main page items
//const items = ["First item", "Second item", "3nd item"];
//Work page items
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

const itemsSchema = {
    name: {
        type: String,
        required: true
    }
};

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
	name: "Welcome to your todolist!"
});

const item2 = new Item({
	name: "Hit the + button to add a new item."
});

const item3 = new Item({
	name: "<- Hit this to delete an item."
});


app.get("/", function (req, res) {
    Item.find({}, function(err, foundItems){
        if (foundItems.length === 0) {            
            Item.insertMany([item1, item2, item3], function(err){
                if(!err){
                    console.log("Inserted the items to the database.");
                }
            });            
            res.redirect("/");
        } else {

		    res.render("list", {listTitle: "Today", newListItems: foundItems});//ejs method    
        }
	
	});

});

app.get("/work", function (req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});

});


app.post("/delete", function (req, res) {
    Item.findByIdAndRemove(req.body.checkbox, function (err) {
        if (!err) {
            console.log("Successfully deleted checked item.");
        }
    });
    res.redirect("/");    
});

app.post("/", function (req, res) {
    //get and push new item to the specific array list
    if (req.body.btn === "Work List") {
        workItems.push(req.body.newItem);
        res.redirect("/work");

    } else {
        // items.push(req.body.newItem);
        const newItem = new Item({
            name: req.body.newItem
        });
        newItem.save(function (err) {
            if (!err) {
                console.log("Added new item.");    
            }
            });

        res.redirect("/");     
        
    }
    

});


app.listen(port, function () {
    console.log(`Server successfully started on port ${port}...`);

});

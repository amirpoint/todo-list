//jshint esversion:6

//example output: Friday 18 October
exports.getDate = function () {
    let today = new Date();
    return today.toLocaleDateString("en-US", {weekday: "long", day: "numeric", month: "long"});
};

//example output: Saturday
exports.getDay = function () {
    let today = new Date();
    return today.toLocaleDateString("en-US", {weekday: "long"});
    
};
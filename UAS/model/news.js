const mongoose = require("mongoose"),
 newsSchema = mongoose.Schema({
    title:String,
    publisher:String,
    description:String 
});

module.exports = mongoose.model("News",newsSchema);
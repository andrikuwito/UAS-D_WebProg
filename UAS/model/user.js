const mongoose = require("mongoose"),
 userSchema = mongoose.Schema({
    fname:String,
    lname:String,
    username:String,
    email:String,
    password:String,
    games:[{type: mongoose.Schema.ObjectId, ref: "Produk"}],
    
});

module.exports = mongoose.model("User",userSchema); 
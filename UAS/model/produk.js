const mongoose = require("mongoose"),
 produkSchema = mongoose.Schema({
    title:String,
    publisher:String,
    description:String,
    developer:String,
    release:String,
    tags:String,
    rating:String,  
    platform:String,
    price:String,
    img:[String],
    role:String
});

module.exports = mongoose.model("Produk",produkSchema); 
const { query } = require('express');
const express = require('express');
const { reset } = require('nodemon');
const router = express.Router()
const Produk = require("../model/produk")
const User = require('../model/user')
const mongoose = require('mongoose')
mongoose.connect(
    "mongodb://127.0.0.1:27017/virtual-labs",
    { useNewUrlParser: true, useUnifiedTopology: true }

);


const db = mongoose.connection;

router.get('/:username', async function (req, res) {
    const user= await User.findOne({username:req.params.username})
    let library = []
    db.collection("produks").aggregate([
        { "$match": { "_id":{"$in":user["games"]}}},
        
        {
            $lookup: {
                "from": "users",
                "localField": "_id",
                "foreignField": "games",
                "as": "library"
            }
        },

        { "$replaceRoot": { "newRoot": { "$mergeObjects": [{ "$arrayElemAt": ["$library", 0], }, "$$ROOT"] } } },
        { "$project": { "library": 0 } }
       
    ]).toArray(async function(err, result) {
        library=result
        console.log(library)
        if (req.isAuthenticated()) {
            res.render('library/library', { username: req.user.username, isLoggedIn: true, library:library });
        }
    })
});


router.get('/search', async (req, res) => {
    let prod
    if (req.query.search) {
        await produk.find({ "title": { '$regex': req.query.search, "$options": "i" } }, function (err, allproduk) {
            if (err) {
                console.log(err);
            } else {
                prod = allproduk
            }
        })
    }
    else {
        await Produk.find({}, function (err, allproduk) {
            if (err) {
                console.log(err);
            } else {
                prod = allproduk
            }
        })
    }
    res.render('search/search', { produks: prod })
})

module.exports = router
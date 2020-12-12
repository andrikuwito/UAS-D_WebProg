const { query } = require('express');
const express = require('express');
const { reset } = require('nodemon');
const router = express.Router()
const Produk = require("../model/produk")


router.get('/', function (req, res) {
    var noMatch = null;
    if (req.query.search) {
        Produk.find({ "title": { $regex: new RegExp(req.query.search, "i") } }, function (err, allproduk) {
            if (err) {
                console.log(err);
            } else {
                if (allproduk.length < 1) {
                    noMatch = "kaga ada";
                }
                if (req.isAuthenticated()) {
                    res.render('browse/browse', { username: req.user.username, isLoggedIn: true, produks: allproduk, noMatch: noMatch });
                } else {
                    res.render('browse/browse', { isLoggedIn: false, produks: allproduk, noMatch: noMatch });
                }
            }
        })
    } else {
        Produk.find({}, function (err, allproduk) {
            if (err) {
                console.log(err);
            } else {
                if (req.isAuthenticated()) {
                    res.render('browse/browse', { username: req.user.username, isLoggedIn: true, produks: allproduk, noMatch: noMatch });
                } else {
                    res.render('browse/browse', { isLoggedIn: false, produks: allproduk, noMatch: noMatch });
                }
            }
        });
    }
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
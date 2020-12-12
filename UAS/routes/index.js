const { query } = require('express');
const express = require('express');
const { reset } = require('nodemon');
const router = express.Router()
const Produk = require("../model/produk")

router.get('/', async function (req, res) {
    const produk = await Produk.find()
    if (req.isAuthenticated()) {
        res.render('index', { username: req.user.username, isLoggedIn: true, produks:produk });
    } else {
        res.render('index', { isLoggedIn: false,produks:produk });
    }
});



router.get('/search', async (req, res) => {
    let prod
    if (req.query.search) {
        await Produk.find({ "title": { '$regex': req.query.search, "$options": "i" } }, function (err, allproduk) {
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
    if (req.isAuthenticated()) {
        res.render('search/search', { username: req.user.username, isLoggedIn: true,produks: prod });
    } else {
        res.render('search/search', { isLoggedIn: false,produks: prod });
    }
})
module.exports = router
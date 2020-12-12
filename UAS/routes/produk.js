const { query } = require('express');
const express = require('express');
const { reset } = require('nodemon');
const router = express.Router()
const Produk = require('../model/produk')
const User = require('../model/user')

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
    res.render('search/search', { produks: prod })

})

router.get('/:_id', async (req, res) => {
    const produk = await Produk.findOne({ _id: req.params._id })

    if (produk == null) { res.redirect('/') }
    else {
        if (req.isAuthenticated()) {
            res.render('produk/produk', { username: req.user.username, isLoggedIn: true, produk: produk });
        } else {
            res.render('produk/produk', { isLoggedIn: false, produk: produk });
        }
    }
})

router.post('/:_id', async (req, res) => {
    const produk = await Produk.findOne({_id:req.params._id})
    console.log(produk._id)
    if (req.isAuthenticated()) {
        User.findOneAndUpdate(
            { '_id': req.user.id },
            { $push: { games: produk._id } },
            { safe: true, upsert: true, new: true },
            function (err, model) {
                console.log(err);
            }
        );
        res.redirect(`/library/${req.user.username}`);
    }
    else {
        res.render('login/signin')
    }
})


module.exports = router
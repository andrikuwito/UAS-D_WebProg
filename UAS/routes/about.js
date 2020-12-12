const { query } = require('express');
const express = require('express');
const { reset } = require('nodemon');
const router = express.Router()
const Produk = require("../model/produk")

router.get('/', async function(req, res){
    if (req.isAuthenticated()) {
        res.render('about/about', { username: req.user.username, isLoggedIn: true});
    } else {
        res.render('about/about', { isLoggedIn: false });
    }
})



router.get('/search',async(req,res)=>{
    let prod
    if(req.query.search) {
        await produk.find({"title":{'$regex':req.query.search,"$options":"i"}},function(err, allproduk){
            if(err){
                console.log(err);
            } else {
                prod=allproduk
            }
        })
    }
    else{
        await Produk.find({}, function(err, allproduk){
            if(err){
                console.log(err);
            } else {
                prod=allproduk
            }
        })
    }
    res.render('search/search',{produks:prod})
})

module.exports=router
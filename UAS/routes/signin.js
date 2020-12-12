const express = require('express')
const router = express.Router()
const User = require("../model/user")
const bcrypt = require('bcrypt')


router.get('/',(req,res)=>{
    res.render('login/signin')
})

module.exports=router
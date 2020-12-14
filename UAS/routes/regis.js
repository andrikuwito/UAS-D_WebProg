const express = require('express')
const router = express.Router()
const user = require("../model/user")
const bcrypt = require('bcrypt')

router.get('/',(req,res)=>{
    res.render('login/regis')
})

router.post('/',(req,res)=>{
    newuser(req,res);
    res.redirect('/signin')
})

async function newuser  (req,res){
    const User =await  user.findOne({username:req.user.username})
    if(User.username==user){
        
    }
    var new_user = new user();
    const hashed_pass = await bcrypt.hash(req.body.password,10)
    new_user.fname=req.body.fname
    new_user.lname=req.body.lname
    new_user.username=req.body.username
    new_user.email=req.body.email
    new_user.password=hashed_pass
    

    new_user.save((err,product)=>{
        if(err)console.log(err);
    });

}



module.exports=router
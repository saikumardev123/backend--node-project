
const userModel = require('../model/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
dotenv.config();


exports.register = async (req,res) =>{
    var userDetails = req.body;
    var salt = bcrypt.genSaltSync(10);
     let user = {
        "username": userDetails.username,
        "password":  bcrypt.hashSync(userDetails.password,salt),
        "emailId":userDetails.emailId,
        "mobileNumber":userDetails.mobileNumber
     }
    console.log("userDetails", user);
    var newUser =  new userModel(user);
    
     let resp = await userModel.find({username:userDetails.username});
     console.log("resp", resp);
     if(resp.length > 1){
        if(resp[0]._id){
            console.log("the user is already available in DB");
            res.send({isRegistered: false, message: "username already available"});
        }
    }
    try{
        let response =  await newUser.save();
         console.log(response);
         if(response._id){
             var payload = { "subject": response._id }
            let token= jwt.sign(payload,process.env.SECRET_KEY);
             res.send({isRegistered: true, message:"successfully registered!", token:token});
         }
    }
    catch(error){
        console.log("inside catch block");
        console.log(error.message);
         res.send({isRegistered: false, message: error.message});
    }
    
}


exports.login = async (req,res) => {

    var userDetails = req.body; 

    let resp = await userModel.find({emailId:userDetails.emailId});
    if(resp.length > 0){
        if(resp[0]._id){
            
             if(bcrypt.compareSync(userDetails.password,resp[0].password))
             {   
                var payload = { "subject": resp[0]._id }
                let token= jwt.sign(payload,process.env.SECRET_KEY);
                 res.send({isLoggedIn: true, message:"Login Sucess!", token:token});
             }
             else
             {
                 res.send("password is incorrect!!");
             }

            // console.log("the user is already available in DB");
            // res.send({isRegistered: false, message: "username already available"});
        }
    }
    else
    {
        res.send("emailid not registered!");
    }

}

exports.changePassword = async (req,res) => {
    console.log("I am in change password");
    res.send("password changed");
}
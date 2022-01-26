
const userModel = require('../model/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
const emailService = require("../services/EmailService");
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
    console.log(req.body);
    let emailId = req.body.emailId;
    let password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    let newPassword =  bcrypt.hashSync(req.body.newPassword,salt);

     userModel.findOne({emailId:emailId},function(err,data){
           if(err){
               res.send(err.message);
           }
           if(data){
                  console.log("email found");
                 if(bcrypt.compareSync(password,data.password)){
                     console.log("password validation in progress!");
                    userModel.updateOne({emailId:emailId},{password:newPassword},function(err){
                        console.log("updation in progress");
                        if(err){
                            console.log(err.message);
                            res.send(err.message);
                        }
                        else
                        {
                            res.send("password updated successfully!");
                        }
                    })

                 }
                 else{
                     res.send("enter valid current password");
                 }
           }
     })
}

exports.forgotPassword = async (req,res) =>{
     console.log("I am in forgot password");
     let emailId = req.body.emailId;
    let resp = await userModel.find({emailId:emailId});
     if(resp.length > 0){
        let options= {
            to :emailId,
            subject: "Password Reset",
            text: "Password Reset",
            html :`

                 <h1><a href='https://www.facebook.com'>Click here to  Reset the password</a></h1>
                 
                  `
       }
        emailService.sendEmail(options);
     }
    console.log(resp);
    res.send("email Sent");
}
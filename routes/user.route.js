var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
var userModel = require('../model/user.model');
dotenv.config();
var userController = require("../controllers/user.controller");
var jwt = require('jsonwebtoken');

var authMiddleware = (req,res,next) => {
        
          var email = req.body.emailId;
          console.log("email", email);
          if(req.headers.authorization){
                let token = req.headers.authorization.split(" ")[1];
                jwt.verify(token,process.env.SECRET_KEY,function(err, payload){
                    if(err){
                        console.log("error", err);
                        res.status(401).send(err.message);
                    }
                    if(payload){
                        console.log(payload);
                          
                         userModel.find({emailId:email},function(err, result){
                             console.log("Result", result);
                             console.log("error", err);
                               if(err){
                                   res.send(err.message);
                               }
                               if(result.length > 0){
                                     
                                 if(result[0]._id == payload.subject){
                                     next();
                                 }
                                 else{
                                     res.status(401).send("unauthorized");
                                 }
                               }
                               else{
                                   res.status(401).send("unauthorized");
                               }
                         })
                    }
                })
          }
          else{
              res.status(401).send("no token provided");
          }
}
router.post("/changePassword",authMiddleware,userController.changePassword);
router.post('/register',userController.register);
router.post("/login", userController.login);
router.post("/forgotPassword", userController.forgotPassword);
router.put("/resetPassword", userController.resetPassword);
module.exports = router;

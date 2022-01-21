
const userModel = require('../model/user.model');

exports.register = async (req,res) =>{
    var userDetails = req.body;
    console.log("userDetails", userDetails);
    var newUser =  new userModel(userDetails);
    
     let resp = await userModel.find({username:userDetails.username});
     console.log("resp", resp);
      if(resp[0]._id){
          console.log("the user is already available in DB");
          res.send({isRegistered: false, message: "username already available"});
      }

    try{
        let response =  await newUser.save();
         console.log(response);
         if(response._id){
             res.send({isRegistered: true, message:"successfully registered!"});
         }
    }
    catch(error){
        console.log("inside catch block");
        console.log(error.message);
         res.send({isRegistered: false, message: error.message});
    }
    
}

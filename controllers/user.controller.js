
const userModel = require('../model/user.model');

exports.register = async (req,res) =>{
    var userDetails = req.body;
    var newUser =  new userModel(userDetails);
    let response =  await newUser.save();
     if(response instanceof Error){
         res.send(response.message)
     }
     else{
         res.send("Registration success");
     }
}

const mongoose = require('mongoose');

 var Schema = mongoose.Schema;

 var userSchema = new Schema(
     {
           username: {
               type: String,
               required:true
           },
           password: {
               type: String,
               required:true
           },
           emailId: {
               type:String,
               required:true
           },
           mobileNumber: {
               type:Number,
               required:true
           }
     }
 )
module.exports = mongoose.model('user',userSchema);

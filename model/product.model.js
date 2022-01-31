const mongoose = require('mongoose');

 var Schema = mongoose.Schema;

 var productSchema = new Schema(
     {
           pid: {
               type: Number,
               required:true,
               unique:true
           },
           name: {
               type: String,
               required:true,
               unique:true
           },
           price: {
               type:Number,
               required:true,
               unique:true
           },
           brand: {
               type:String, 
               required:true
           },
           imageUrl: {
               type:String,
               required:true
           }
     }
 )
module.exports = mongoose.model('product',productSchema);

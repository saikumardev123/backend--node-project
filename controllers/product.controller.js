var productModel = require("../model/product.model");

exports.add = (req,res) => {
console.log(req.body);

var product = new productModel(req.body);
 
product.save(function(err, data){
    if(err){
        res.send(err.message);
    }
    if(data){
        res.send("product added successfully!");
    }
})
}

exports.getProducts = (req,res) => {
    productModel.find({}, function(err,products){
        if(err){
            res.send(err.message);
        }
        else{
            res.send(products);
        }
       
    })
}
// http://localhost:8099/product/101

exports.getProduct = (req,res) => {

      var pid = req.params.pid;

    productModel.findOne({pid:pid}, function(err,product){
        if(err){
            res.send(err.message);
        }
        else{
            res.send(product);
        }
       
    })
}

exports.updateProduct = (req,res) => {
    var body = req.body;
  productModel.updateOne({pid:body.pid},body,function(err,product){
      if(err){
          res.send(err.message);
      }
      else{
          res.send(product);
      }
     
  })
}

exports.removeProduct = (req,res) => {
    var pid = req.params.pid;
      productModel.deleteOne({pid:pid}, function(err){
          if(err){
              res.send(err.message);
          }
          else{
              res.send("product deleted successfully!");
          }
      })
}
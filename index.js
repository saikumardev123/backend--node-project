const express = require('express');
const app = express();
const dotenv = require('dotenv');
const DB = require('./services/db');
const cors =require('cors');
const UserRouter = require("./routes/user.route");
const ProductRouter = require("./routes/product.route");

dotenv.config();
DB.connectToDB();

app.use(express.json());
app.use(cors());
app.use(UserRouter);
app.use(ProductRouter);

app.get("/healthcheck", function(req,res){
    res.send("App is running!");
})

app.listen(process.env.PORT_NO, ()=> {
    console.log("Server started on port", process.env.PORT_NO);
})


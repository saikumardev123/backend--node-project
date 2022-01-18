const express = require('express');
const app = express();
const dotenv = require('dotenv');
const DB = require('./services/db');
const UserRouter = require("./routes/user.route");

dotenv.config();
DB.connectToDB();

app.use(express.json());
app.use(UserRouter);

app.get("/healthcheck", function(req,res){
    res.send("App is running!");
})


app.listen(process.env.PORT_NO, ()=> {
    console.log("Server started on port", process.env.PORT_NO);
})

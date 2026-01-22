const express  = require('express');
const app = express()
const Auth = require("./Routes/authRoutes");
const connectDB = require("./config/db");
const port = 3000;

app.use(express.json());

connectDB();
app.get('/',(req,res) =>{
    console.log("go use the end point");
})
app.use('/api', Auth); 

app.listen(port , ()=>{
    console.log("server Listen");
})
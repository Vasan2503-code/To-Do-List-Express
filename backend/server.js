const express = require('express');
const app = express()
const Auth = require("./Routes/authRoutes");
const connectDB = require("./config/db");
const port = process.env.PORT || 3000;
const cors = require('cors');
require("dotenv").config();

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
connectDB();
app.get('/', (req, res) => {
    console.log("go use the end point");
})

app.use('/api', Auth);

app.listen(port, () => {
    console.log("server Listen");
})
const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb+srv://srinivasansiet142_db_user:M8YAcZ6I2w8uGCx3@cluster0.fcf0lvm.mongodb.net/?appName=Cluster0')
        console.log("Db connected successfully");
    }
    catch(err){
        console.error("Error in connecting to db" ,err);
        process.exit(1);
    }
}

module.exports = connectDB;
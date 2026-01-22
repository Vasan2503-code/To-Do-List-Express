const express = require("express");
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWTsecret = '1234567890--09876541()sadgf#$@#^%#()_+_!@#@2343544321kjhfygk';

const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json("All fields are required");
        }

        const currentUser = await User.findOne({ email });

        if (currentUser) {
            return res.status(401).json("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (e) {
        return res.status(500).send(e.message);
    }

};

//login

const login = async (req ,res) =>{
    try{
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(401).json("EMAIL does'nt exist or password may be wrong");
        }

        const currentUser = await User.findOne({email});

        if(!currentUser){
            return res.status(402).json("user does'nt exist");
        }

        const isMatch = await bcrypt.compare(password , currentUser.password);

        if(!isMatch){
            return res.status(404).json("Wrong password");
        }
        const token = jwt.sign({id : currentUser._id} , JWTsecret, {expiresIn : '1h'})
        res.status(201).json({ message : "User logged in successfully" ,token});
    }
    catch(e){
        res.status(500).json("Internnal server error");
    }
};


const getUser = async(req, res)=>{
    try{
        const users =  await User.find();
        res.send(users);
    }
    catch(e){
        res.send("Server error");
    }
}

module.exports = {
    login,
    register,
    getUser
};
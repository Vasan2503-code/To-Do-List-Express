const router = require('express').Router()

// router.get('/login' , (req , res) => {
//     res.send("Login! close it");
// })
// router.get('/signup' , (req , res) => {
//     res.send("Sign in! close it");
// })

 router.post('/api' , (req, res)=>{
    res.send("Working of express");
 })

module.exports = router
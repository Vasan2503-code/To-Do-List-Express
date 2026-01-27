const jwt = require('jsonwebtoken');
const JWTsecret = '1234567890--09876541()sadgf#$@#^%#()_+_!@#@2343544321kjhfygk'


const middleWare = (req , res , next)=>{
    const token = req.header("Authorization");

    if(!token || !token.startsWith('Bearer')){
        return res.status(401).send({message : "unAuthorized"});
    }
    const tokenValue = token.split(' ')[1];

    jwt.verify(tokenValue , JWTsecret, (err , user) =>{
        if(err){
            return res.status(401).json({ message : "Unauthorized" })
        }
        req.user = user;
        next();
    })
}

module.exports = middleWare;
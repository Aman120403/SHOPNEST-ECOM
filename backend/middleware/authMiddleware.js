const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const protect = async(req,res,next) =>{
    let token;
    console.log("here i am 2")
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
            const user = await User.findById(decoded.id).select('-password');
        
            req.user = user;
            next();

        } catch (error) {
            res.status(401).json({message: 'Not authorized, token failed'});

        }
    }
    if(!token){
        res.status(401).json({message: 'Not authorized, token failed'});
    }
}

module.exports = {protect};
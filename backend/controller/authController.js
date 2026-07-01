const User = require('../model/userModel')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const sendEmail = require("../utils/sendEmail");


const generateToken = (id)=>{
    const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"});
    console.log("token ", token);
    return token;

};
//Register a new user
const registerUser = async (req,res) =>{
    const {name, email, password} = req.body;
    console.log("Email_user ", process.env.EMAIL_USER);
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 10 * 60 * 1000; // valid for 10 minutes
        console.log("otp ", otp);
        console.log("otpExpiry ", otpExpiry);
        const user = await User.create({name, email, password:hashedPassword, otp, otpExpiry});
        if(user){
            const message = `Welcome to shopnest, ${name}! 
            Your OTP for Shopnest registration is: ${otp}`;

            await sendEmail(email, 'Welcome to Shopnest - Your OTP for registration', message);

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                message:"Registration successful. OTP sent to your email. Please verify to activate your account."

            });
        }
        else{
            res.status(400).json({message:"Invalid user data"});

        }

    } catch (error) {
        res.status(500).json({message:"Server error"});
        
    }
}

//Api for verifying otp

const verifyOtp = async (req, res) => {
    try{
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "User is already verified" });
        }
        if(user.otp !== otp){
            return res.status(400).json({ message: "Invalid OTP" });
        }
        if(user.otpExpiry < Date.now()){
            return res.status(400).json({ message: "OTP expired" });
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        res.status(200).json({ message: "Account verified successfully" });


    }
    catch(error){
        console.error("Error during OTP verification: ", error);
        res.status(500).json({ message: "Server error during OTP verification" });
    }
};
//Api for resending otp
const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }  
        if (user.isVerified) {
            return res.status(400).json({ message: "User is already verified" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 10 * 60 * 1000;
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
        const message = `Your new OTP for Shopnest registration is: ${otp}\nThis code expires in 10 minutes.`;
        await sendEmail(email, 'Shopnest - Your new OTP for registration', message);
        res.status(200).json({ message: "New OTP sent to your email" });   
    } catch (error) {
        console.error("Error during OTP resend: ", error);
        res.status(500).json({ message: "Server error during OTP resend" });
    }

};
//Login page api
const loginUser =  async(req,res) =>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))){
            res
            .status(201)
            .json({
                _id: user._id,
                email:user.email,
                role:user.role,
                token:generateToken(user._id)
            });

        }else{
            res
            .status(400)
            .json({
                message:'Invalid email or password'
            });
        }
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
}


// Get current user
const getUsers = async(req,res) =>{
    try {
        const users = await User.find({}).select('-password');
        res.
        status(201)
        .json(users);

    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
}

module.exports = {
    generateToken,
    registerUser,
    loginUser,
    getUsers,
    verifyOtp,
    resendOtp
};
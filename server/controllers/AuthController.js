const User = require('../models/usermodel.js');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const registerUser= async (req,res)=>{
    // const {username, password, firstname, lastname}=req.body;

    const salt=await bcrypt.genSalt(10);
    const passwordHash=await bcrypt.hash(req.body.password,salt)
    req.body.password=passwordHash
    const newUser= new User(req.body);
    const {username}= req.body

    try{
        const oldUser= await User.findOne({username})
        if(oldUser){
            return res.status(400).json({message:"Username is already registered"})
        }
        const user= await newUser.save();
        const token= jwt.sign({
            username:user.username, id: user._id
        },process.env.JWT_SECRET,{expiresIn:"1 day"})
        res.status(200).json({user, token})
    }catch (err){
        res.status(500).json({message: err.message})
    }
}

const LoginUser=  async (req, res)=>{
    const {username, password}=req.body;
    if (!username || !password){
        return res.send("Please fill all details")
    }
    const user=await  User.findOne({username});
    if(!user){
        return res.send("Incorrect email or password")
    } 
    const isPassword= await bcrypt.compare(password, user.password);
    if(!isPassword){
        return res.send("Incorrect email or password");
    }else{
        const token= jwt.sign({
            username:user.username, id: user._id
        },process.env.JWT_SECRET,{expiresIn:"1 day"})
        res.status(200).json({token, user})
    }
    
}

module.exports={registerUser, LoginUser};


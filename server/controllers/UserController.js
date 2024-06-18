const { genSalt } = require('bcrypt');
const User=require('../models/usermodel.js');
const jwt=require('jsonwebtoken');

const getAllUser= async (req,res)=>{
    try{
        let users= await User.find();
        users=users.map((user)=>{
            const {password,...otherdetails}=user._doc
            return otherdetails
        })
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json(err)
    }
}

const GetUser= async (req,res)=>{
    const id=req.params.id;
    
    try{
        const  user= await User.findById(id);
        if(!user){
            res.status(404).json({message:'User not found'})
            }
            const {password, ...otherdetails}=user._doc;
          res.status(200).json(otherdetails);
    }
    catch (err) { 
        res.status(500).json({message: err.message})
    }; 
}

const UpdateUser= async (req, res)=>{
    const id=req.params.id;
    const {_id, currentUserAdminStatus, password}= req.body;

    if(id===_id || currentUserAdminStatus===true){
    try{
        if(password){
            const salt= await bycrypt.genSalt(10);
            req.body.password= await bycrypt.hash(password, salt);
        }
        const user= await User.findByIdAndUpdate(id,req.body, {new:true,})
        const token= jwt.sign({username: user.username, id: user._id}, process.env.JWT_SECRET,{expiresIn:"1h"})
       
        res.status(200).json({user, token})
    }
    catch(err){
        res.status(500).json(err)
        }
    }
    else{
        res.status(403).json('You are not authorized to make this change');
    }
}

const deleteUser= async (req, res)=>{
    const id=req.params.id;
    const {currentUserId, currentUserAdminStatus}=req.body;
    if(currentUserId===id || currentUserAdminStatus===true){
        try{
            await User.findByIdAndDelete(id);
            res.status(200).json("User deleted successfully")
        }
        catch(err){
            res.status(500).json(err)
        }
        
    }
    else{
        res.status(403).json("Access Denied, you can delete only your own profile")
    }
}

//Follow User
const followUser=  async (req, res)=>{
    const id=req.params.id;
    const {_id}=req.body;

    if(_id===id){
        res.status(403).json("You cant follow your own profile");
    }
    else{
        try{
            const followUser= await User.findById(id);
            const followingUser= await User.findById(_id);
            if(!followUser.followers.includes(_id)){
                await followUser.updateOne({$push:{followers:_id}})
                await followingUser.updateOne({$push:{following:id}})
                res.status(200).json("User Followed")
            }
            else{
                res.status(403).json("User already followed")
            }
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}

//Unfollow User
const unfollowUser= async (req,res)=>{
    const id= req.params.id;
    const {_id}=req.body;
    if(_id===id){
        res.status(403).json("You cant unfollow your own profile");
    }
    else{
        try{
            const followerUser= await User.findById(id);
            const followingUser= await User.findById(_id);

            if(followerUser.followers.includes(_id)){
                await followerUser.updateOne({$pull:{followers:_id}});
                await followingUser.updateOne({$pull:{following:id}});
                res.status(200).json("User unfollowed")
            }
            else{
                res.status(403).json("User is not followed by you")
            }
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}

// const unfollowUser = async (req, res) => {
//     const id = req.params.id;
//     const { currentUserId } = req.body;

//     try {
//         // Ensure both IDs are valid
//         const followUser = await User.findById(id);
//         const followingUser = await User.findById(currentUserId);

//         if (!followUser || !followingUser) {
//             res.status(404).json("User not found");
//             return;
//         }

//         // Check if the user is trying to unfollow their own profile
//         if (currentUserId === id) {
//             res.status(403).json("You can't unfollow your own profile");
//             return;
//         }

//         // Check if the user is already following the target user
//         if (!followingUser.following.includes(id)) {
//             res.status(403).json("You are not following this user");
//             return;
//         }

//         // Update the follower and following lists
//         await followUser.updateOne({ $pull: { followers: currentUserId } });
//         await followingUser.updateOne({ $pull: { following: id } });

//         res.status(200).json("User unfollowed");
//     } catch (err) {
//         console.error(err);
//         res.status(500).json("An error occurred while processing your request");
//     }
// };


module.exports= {GetUser ,UpdateUser, deleteUser ,followUser, unfollowUser, getAllUser};

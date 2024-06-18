const PostModel =require('../models/postmodel.js');
const User= require("../models/usermodel.js");
const mongoose=require('mongoose');

//Create a post
const CreatePost= async (req,res)=>{

    const newPost= new PostModel(req.body);
    try{
        await newPost.save();
        res.status(200).json(newPost)
    }
    catch(err){
        res.status(500).send(err)
    }
}
// Get a post
const GetPost= async (req, res)=>{
    const id= req.params.id;
    try{
        const post= await  PostModel.findById(id);
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).send(err)
    }
}
// update a post
const UpdatePost= async (req, res)=>{
    const id=req.params.id;
    const {userId}=req.body;
    try{
        const post= await PostModel.findById(id);
        if(post.userId===userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("Post Updated");
        }
        else{
            res.status(403).json('Action forbidden');
        }
    }catch(err){
        next(err)
    }
}
// Delete a post
const DeletePost= async (req, res)=>{
    const id=req.params.id;
    const {userId}=req.body;
    try{
        const post= await PostModel.findById(id);
        if(post.userId===userId){
            await post.deleteOne();
            res.status(200).json('Post deleted Successfully');
        }
        else{
            res.status(403).json('Action forbidden')
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

//Like Post
const LikePost= async (req, res)=>{
    const id=req.params.id;
    const {userId}=req.body;
    try{
        const post= await PostModel.findById(id);
        if(!post.likes.includes(userId)){
            await post.updateOne({$push:{likes:userId}});
            res.status(200).json('Like Added Successfully')
        }
        else{
            await post.updateOne({$pull:{likes:userId}});
            res.status(200).json('Disliked successfully')
        }
    }catch(err){
        res.status(500).json(err)
    }
}

// Show Timeline posts
const getTimelinePosts= async (req, res)=>{
    const userId= req.params.id;
    try{
        const currentUserPosts= await PostModel.find({userId: userId});
        const followingPosts= await User.aggregate([
            {
                $match:{
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            },
            {
                $project:{
                    followingPosts:1,
                    _id:0
                }
            }
            
        ])
        res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts)
    .sort((a,b)=>{
        return b.createdAt-a.createdAt;
    }));
    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports={CreatePost, GetPost, UpdatePost, DeletePost, LikePost, getTimelinePosts};
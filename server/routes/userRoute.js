const express=require('express');
const router=express.Router();
const {GetUser, UpdateUser, deleteUser, followUser, unfollowUser, getAllUser} =require("../controllers/UserController.js")

router.get('/',getAllUser)
router.get('/:id',GetUser);
router.patch('/:id', UpdateUser);
router.delete('/:id', deleteUser);
router.patch('/:id/follow',followUser);
router.patch('/:id/unfollow', unfollowUser);

module.exports=router;
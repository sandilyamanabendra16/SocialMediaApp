const express = require('express');
const { CreatePost, GetPost, UpdatePost, DeletePost, LikePost, getTimelinePosts } = require('../controllers/PostController.js');
const router = express.Router();

router.post('/', CreatePost );
router.get('/:id', GetPost);
router.patch('/:id',UpdatePost);
router.delete('/:id', DeletePost);
router.patch('/:id/like', LikePost);
router.get("/timeline/:id", getTimelinePosts)

module.exports = router;
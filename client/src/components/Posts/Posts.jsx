import React, { useEffect } from 'react';
import "./Posts.css";
// import { PostsData } from '../../Data/PostData';
import { useDispatch ,useSelector } from 'react-redux';
import Post from '../Post/Post';
import { getTimelinePosts } from '../../actions/postAction';
import { useParams } from "react-router-dom";

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const{user}=useSelector((state)=> state.authReducer.authData)
  const {posts, loading}=useSelector(state => state.postReducer)

  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))
  },[])
  if(!posts) return 'No Posts';
  // if(params.id) posts =posts.filter((post)=> post.userId=params.id)
  return (
    <div className="posts">
        {loading? "Fetchding Post" :posts.map((post, index) => { 
            return ( <Post key={index} data={post} /> ) })}
    </div>
  )
}

export default Posts
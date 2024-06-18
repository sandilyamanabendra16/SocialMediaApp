import axios from "axios";

const API= axios.create({ baseURL:"http://localhost:5000"})

export const getTimelinePosts=(id)=> API.get(`post/timeline/${id}`)
export const likePost=(id,userId)=>API.patch(`post/${id}/like`, {userId: userId})
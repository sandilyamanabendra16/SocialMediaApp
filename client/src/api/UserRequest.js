import axios from 'axios'

const API= axios.create({ baseURL:'http://localhost:5000' });

export const getUser = (userId) => API.get(`/user/${userId}`) ;

export const updateUser=(id, formData)=>API.patch(`/user/${id}`, formData);

export const getAllUser=()=>API.get('/user');

export const folloUser=(id,data)=>API.patch(`/user//${id}/follow`, data);

export const unFolloUser=(id,data)=> API.patch(`/user//${id}/unfollow`, data);
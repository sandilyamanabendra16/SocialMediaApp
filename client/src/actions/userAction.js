import * as UserApi from "../api/UserRequest";

export const updateUser=(id, formData)=> async(dispatch)=>{
    dispatch({type:"UPDATE_START"})
    try{
        const {data}= await UserApi.updateUser(id, formData);
        dispatch({type: "UPDATE_SUCCESS", data: data})
    }
    catch(err){
        dispatch({type:"UPDATE_FAILURE"})
    }
}

export const folloUser=(id,data)=> async(dispatch)=>{
    dispatch({type:"FOLLOW_USER"})
    UserApi.folloUser(id,data);
}

export const unFollowUser=(id, data)=> async(dispatch)=>{
    dispatch({type:"UNFOLLOW_USER"})
    UserApi.unFolloUser(id,data);
}
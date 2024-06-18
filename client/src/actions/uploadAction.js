import * as UploadApi from '../api/uploadRequest'

export const uploadImage= (data)=> async (dispatch)=>{
    try{
        await UploadApi.uploadImage(data)
    }catch(err){
        console.log(err)
    }
}

export const UploadPost=(data)=>async (dispatch)=>{
    dispatch({type:"Upload_start"})
    try{
        const newPost= await UploadApi.uploadPost(data)
        dispatch({type:"Upload_success", data: newPost.data})
    }
    catch(err){
        console.log(err)
        dispatch({type:"Upload_failed"})
    }
}

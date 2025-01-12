import React, {useState} from 'react';
import './PostShare.css';
import ProfileImg from '../../img/profiled.jpg';
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadPost, uploadImage } from '../../actions/uploadAction';

const PostShare = () => {
    const loading =useSelector((state)=>state.postReducer.uploading)
    const [image, setImage]=useState(null);
    const imageRef=useRef();
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.authReducer.authData);
    const desc=useRef()
    const serverPublic= process.env.REACT_APP_PUBLIC
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          setImage(img);
        }
      };
      const handleUpload= async (e)=>{
        e.preventDefault();
        const newPost={
            userId: user._id,
            desc: desc.current.value,
        }
        if(image){
            const data= new FormData()
            const filename= Date.now() + image.name;
            data.append("name", filename)
            data.append("file",image)
            newPost.image=filename;
            console.log(newPost)
            try{
                dispatch(uploadImage(data))
            }catch(err){
                console.log(err)
            }
        }
        dispatch(UploadPost(newPost));
        resetShare();
      }

      const resetShare = () => {
        setImage(null);
        desc.current.value = "";
      };
    return (
        <div className="PostShare">
            <img src={user.coverPicture? serverPublic+user.coverPicture:ProfileImg} alt="profile"/>
            <div>
                <input ref={desc} required type="text" className="text" placeholder="What's Happening?"/>
            <div className="postOptions">
                <div className="option"
                style={{ color:"var(--photo)"}} onClick={()=>imageRef.current.click()}>
                    <UilScenery/>
                    Photo
                </div>
                <div className="option" 
                style={{color:"var(--video)"}}>
                    <UilPlayCircle/>
                    Video
                </div>
                <div className="option"  style={{color:"var(--location)"}}>
                    <UilLocationPoint/>
                    Location
                </div>
                <div className="option" style={{ color: "var(--shedule)" }}>
                    <UilSchedule />
                    Shedule
                </div>
                <button className="button ps-button"  onClick={handleUpload} disabled={loading}>{loading? "Uploading..":"Share"}</button>
                </div>
                <div style={{display:'none'}}>
                    <input type="file" name="myImage" ref={imageRef} onChange={onImageChange}/>
                </div>
                {image && (
                    <div className="previewImage">
                        <UilTimes onClick={()=>setImage(null)}/>
                        <img src={URL.createObjectURL(image)} alt="preview"/>
                    </div>
                )}
            </div>
        </div>
    )
}
export default PostShare


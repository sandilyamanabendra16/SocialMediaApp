import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/uploadAction';
import { updateUser } from '../../actions/userAction';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  outline: 0
};

export default function ProfileModal({modalOpened,  setModalOpened, data}) {

  const {password,...other}=data;
  const [formData, setFormData]=useState(other);
  const [profileImage, setProfileImage]=useState(null);
  const [coverImage, setCoverImage]=useState(null)
  const dispatch=useDispatch();
  const param= useParams();
  const {user}=useSelector((state)=> state.authReducer.authData)

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name] : e.target.value})
  }
  
  const onImageChange=(e)=>{
    if(e.target.files && e.target.files[0]){
        let img= e.target.files[0];
        e.target.name==="profilephoto"? setProfileImage(img): setCoverImage(img);
    }
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    let UserData= formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilephoto = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
      if (coverImage) {
        const data = new FormData();
        const fileName = Date.now() + coverImage.name;
        data.append("name", fileName);
        data.append("file", coverImage);
        UserData.coverphoto = fileName;
        try {
          dispatch(uploadImage(data));
        } catch (err) {
          console.log(err);
        }
      }
      dispatch(updateUser(param.id, UserData));
      setModalOpened(false);

  }
  console.log(formData)
  return (
    <div>
      <Modal
        open={modalOpened}
        onClose={()=>setModalOpened(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography>
        <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoinput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />

          <input
            type="text"
            className="infoinput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lirstname}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoinput"
            name="worksat"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksat}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoinput"
            name="livesin"
            placeholder="LIves in"
            onChange={handleChange}
            value={formData.livesin}
          />

          <input
            type="text"
            className="infoinput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoinput"
            placeholder="RelationShip Status"
            name="relationship"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name='profilephoto' onChange={onImageChange}/>
            Cover Image
            <input type="file" name="coverphoto" onChange={onImageChange} />
        </div>

        <button className="button infobtn" onClick={handleSubmit}>Update</button>
      </form>
      </Typography>
        </Box>
      </Modal>
    </div>
  )
}

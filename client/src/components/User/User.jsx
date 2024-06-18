import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { folloUser, unFollowUser } from '../../actions/userAction';


const User = ({person}) => {
    const dispatch= useDispatch()
    const serverPublic=process.env.REACT_APP_PUBLIC;
    const { user } = useSelector((state) => state.authReducer.authData);
    const[following, setFollowing]=useState(person.followers.includes(user._id))

    const handlefollow=()=>{
        following?
        dispatch(unFollowUser(person._id,user)):
        dispatch(folloUser(person._id,user));
        setFollowing((prev)=>!prev)
    }

  return (
    <div className="follower">
            <div>
                <img  src={person.profilephoto} alt='' className='followerImg'/>
                <div className="name">  
                    <spam>{person.firstname} {person.lastname}</spam>
                    <span>{person.username}</span>
                </div>
            </div>
            <button className='button fc-button' onClick={handlefollow}> {following? "UnFollow": "Follow"}</button>
        </div>
  )
}

export default User
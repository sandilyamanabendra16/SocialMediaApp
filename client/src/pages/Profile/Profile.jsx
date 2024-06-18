import React from 'react'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import './Profile.css'
import ProfileCard from '../../components/Profilecard/ProfileCard'
import Postside from '../../components/Postside/Postside'
import RightSide from '../../components/RightSide/RightSide'

const Profile = () => {
  return (
        <div className="Profile">
            <ProfileLeft/>
            <div className="profile-center">
                <ProfileCard location="profilePage"/>
                <Postside/>
            </div>
            <RightSide/>
        </div>
  )
}

export default Profile
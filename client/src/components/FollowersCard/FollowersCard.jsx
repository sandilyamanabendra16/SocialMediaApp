import React, { useEffect, useState } from 'react'
import './FollowersCard.css';
import { FollowersData } from '../../Data/FollowersData';
import User from '../User/User';
import { useSelector } from "react-redux";
import { getAllUser } from '../../api/UserRequest';

export const FollowersCard = () => {

  const [person, setperson]=useState([])

  const { user } = useSelector((state) => state.authReducer.authData);


  useEffect(()=>{
    const fetchPersons= async ()=>{
      const {data}= await getAllUser();
      setperson(data)
      console.log(data)
    }
    fetchPersons();
  },[])
  return (
    <div className='followcard'>
        <h3>People you may know</h3>
        {person.map((person, id) => { 
          if(person._id !==user._id) {return ( 
        <User person={person} key={id} />
        )} })}
    </div>
  )
}

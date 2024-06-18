import React from 'react'
import "./TrendCard.css";
import { TrendData } from '../../Data/TrendData';

const TrendCard = () => {
  return (
    <div className="TrendCard">
        <h3> Trends For you</h3>
        {TrendData && TrendData.map((data, index)=>{
            return( 
                <div className="trend">
                    <span key={index}> # {data.name}</span>
                    <span key={index}>{data.shares} k</span>
            </div> 
        )})}
    
    </div>
  )
}

export default TrendCard
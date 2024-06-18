import React from 'react'
import "./Auth.css";
import Logo from '../../img/logo.png'
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { logIn, signUp } from '../../actions/authAction';

const Auth = () => {

  const [isSignUp, setIsSignUp]=useState(false);

  const dispatch=useDispatch()
  const [data, setData]=useState({
    firstname:"",
    lastname: "",
    username: "",
    password:"",
    cpassword:"",
  })

  const [confirmPass, setConfirmPass]=useState(true);

  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(isSignUp){
     data.password===data.cpassword ? dispatch(signUp(data))
     : setConfirmPass(false);
    }
    else{
      dispatch(logIn(data))
    }
  }

  const resetForm=()=>{
    setConfirmPass(true);
    setData({
      firstname:"",
    lastname: "",
    username: "",
    password:"",
    cpassword:"",
    })
  }
  console.log(data);
  return (
    <div className="Auth">
      {/* leftside */}
        <div className="a-left">
            <img src={Logo} alt="" />
            <div className="Webname">
                <h1> ZKC Medica</h1>
                <h6> Explore the ideas throughout the world</h6>
            </div>
        </div>

    {/* Right Side */}
        <div className="a-right">
            <form action="" className="infoForm authForm" onSubmit={handleSubmit}>
                <h3>{isSignUp? "Sign Up": "Log In"}</h3>
                {isSignUp && 
                <div>
                    <input type="text" placeholder='Enter First Name' className="infoinput" name="firstname" onChange={handleChange}
                    value={data.firstname}/>
                    <input type="text" className="infoinput" placeholder='Last Name' name='lastname' onChange={handleChange} 
                    value={data.lastname}/>
                </div>}
                
                <div>
                    <input type="text" className="infoinput"placeholder='Username' name='username'onChange={handleChange}
                    value={data.username}/>
                </div>
                <div>
                    <input type="password" className="infoinput" placeholder='Password' name='password'onChange={handleChange}
                    value={data.password}/>
                    {isSignUp &&
                    <input type="password" className="infoinput" placeholder='Confirm Password' name='cpassword'onChange={handleChange}
                     value={data.cpassword}/> }
                </div>
                <span style={{display: confirmPass? "none": "block", 
                  color:"red", 
                  fontSize: "12px", 
                  alignSelf:"flex-end",
                  marginRight:"5px"}}
                  >
                  *Confirm Password is not same
                </span>
                <div>
                    <span style ={{cursor: "pointer"}} onClick={()=>{setIsSignUp((prev)=>!prev);  resetForm()}}>{ isSignUp? "Already Have an account. Login!" :"Don't have an account? Sign Up"}</span>
                </div>
                <button className="button infobtn" type='submit'> {isSignUp? "Sign Up": "Log in"}</button>
            </form>
        </div>
    </div>
  )
}
function Login() {
    return (
      <div className="a-right">
        <form className="infoForm authForm">
          <h3>Log In</h3>
  
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoinput"
              name="username"
            />
          </div>
  
          <div>
            <input
              type="password"
              className="infoinput"
              placeholder="Password"
              name="password"
            />
          </div>
  
          <div>
              <span style={{ fontSize: "12px" }}>
                Don't have an account Sign up
              </span>
            <button className="button infobtn">Login</button>
          </div>
        </form>
      </div>
    );
  }
function SignUp(){
    return(
        <div className="a-right">
            <form action="" className="infoForm authForm">
                <h3>Sign Up</h3>
                <div>
                    <input type="text" placeholder='Enter First Name' className="infoinput" name="Fname"/>
                    <input type="text" className="infoinput" placeholder='Last Name' name='Lname' />
                </div>
                <div>
                    <input type="text" className="infoinput"placeholder='Username' name='username'/>
                </div>
                <div>
                    <input type="text" className="infoinput" placeholder='Password' name='password'/>
                    <input type="text" className="infoinput" placeholder='Confirm Password' name='cpassword'/>
                </div>
                <div>
                    <span>Already Have an account. Login!</span>
                </div>
                <button className="button infobtn" type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default Auth
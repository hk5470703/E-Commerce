import React, { useState } from 'react'
import '../pages/CSS/LoginSignup.css'

const LoginSignup = () => {
  const [login, setLogin]  = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleClickCondition =() => {
    setLogin(!login)
  }

  const handleLogin = async() => {
    console.log('login', formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData),  
    }).then((response)=> response.json()).then((data)=>responseData=data)
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }

  const handleSignup = async() => {
    console.log('signup', formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData),  
    }).then((response)=> response.json()).then((data)=>responseData=data)
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  } 
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
          <h1>{login ? "Login" : "Sign Up"}</h1>
          <div className="loginsignup-fields">
           {login ? "" : <input name='name' onChange={changeHandler} value={formData.name} type="text" placeholder='Your Name' />} 
            <input name='email' onChange={changeHandler} value={formData.email} type="email" placeholder='Your Email' />
            <input name='password' onChange={changeHandler} value={formData.password} type="password" placeholder='Password' />
          </div>
          <button onClick={()=>{login ? handleLogin() : handleSignup()}}>Continue</button>
          <p className="loginsignup-login" onClick={handleClickCondition}>Already have an account? <span onClick={handleClickCondition}>Login Here</span></p>
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing , I agree the term of use & privacy policy</p>
          </div>
      </div>
      
    </div>
  )
}

export default LoginSignup
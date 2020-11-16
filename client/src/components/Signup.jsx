import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const Signup = (props) =>{
  const [email, handleEmail] = useState('')
  const [password, handlePassword] = useState('')
  const [go,handleGo] = useState(false)
  const [userExist,handleExist] = useState(false)

  const handleChange = (e) => {
    if (e.target.name == 'email') {
      handleEmail(e.target.value)
    }
    else {
      handlePassword(e.target.value)
    }
  }

  const Register = () => {

    console.log("hello")
    var data = JSON.stringify({ "email": email, "password": password });

    var config = {
      method: 'post',
      url: 'http://localhost:8080/api/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    Axios(config)
      .then((response) => {
        console.log(response)
        if(response.data.success === true)
        {
          alert('success')
          handleGo(true)
        }
        if(response.data.message == 'User exists already')
        {
          handleExist(true)
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if( sessionStorage.getItem('login') !== null)
    {

        handleGo(prev => !prev)
    }    
  },[])

  return (
    <div className="login">
      <h2 style={{textAlign:"center"}}>
          Sign up
      </h2>
      <div style={{display:"flex", flexDirection:"column",margin:10}}>
        <label htmlFor="login">
            EMAIL
        </label>
        <input  onChange={(e) => handleChange(e)} name="email" className="inputtab"></input>
      </div>
      <div style={{display:"flex", flexDirection:"column",margin:10,marginTop:20}}>
        <label htmlFor="password">
            PASSWORD
        </label>
        <input onChange={(e) => handleChange(e)} name="password" type="password" className="inputtab"></input>
      </div>
      <button onClick={()=>Register()} style={{width:'100%',padding:'3%',marginTop:'3%',color:"white",backgroundColor:"#005a3c",borderRadius:10,fontSize:20}}>
        <b>Create an account</b>
      </button>
      <button onClick={props.handleSwitch} className="switchtext">Have an account already? Login here</button>
      {userExist ? (<p style={{textAlign:"center",color:"red"}}>User Already Exist</p>) : ('')}
      {go ? (<Redirect to="/dash" ></Redirect>) : ('')}
    </div>
  )
}

export default Signup;
import React, { useState } from 'react';
import './../style/credentials.css'
import Login from './Login';
import Signup from './Signup';

const Credentials = () => {

  const [flag, handleFlag] = useState(true)

  function onOff() {
    console.log("hii")
    handleFlag(prev => !prev)
  }
  return (
    <div className="creds">
      {flag ? (
        <Signup handleSwitch={onOff}/>
      ) : (
        <Login handleSwitch={onOff}/>
      )}
    </div>
  )
}

export default Credentials;
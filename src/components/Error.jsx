import React from 'react'
import "./styles/Error.css";

const Error = () => {
  return (
    <div className='main'>
      <h1>You must allow your browser to get your location.</h1>
      <div className='main__img'>
      <img src={'error.gif'} alt="" />
      </div>
     
    </div>
  )
}

export default Error

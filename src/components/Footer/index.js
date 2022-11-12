import React from 'react'
import { useLocation } from 'react-router-dom';
import './index.css'

const Footer = () => {
  
  const location = useLocation();

  if(location.pathname === '/chat'){
    return <></>
  }

  return (
    <div className='footer-container'>© 2022 | Web Design OpenMarket | All Rights Reserved</div>
  )
}

export default Footer
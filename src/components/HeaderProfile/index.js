import React from 'react'
import logoMini from '../../assets/image/logo-mini.png'
import Title from '../Title';
import './index.css'

const HeaderProfile = ({address}) => {

    const shortAddress = () => {
        if (address) {
          return (
            address.slice(0, 4) +
            "..." +
            address.slice(address.length - 4, address.length)
          );
        } else {
          return "";
        }
      };
  return (
    <div className='header-profile-container'>
        <div className='d-flex vertically-center header-profile'>
                <img alt='logo-mini' src={logoMini} />
                <p> {shortAddress()} </p>
        </div>
        <Title name={'Products'} width={'100%'} />
    </div>
  )
}

export default HeaderProfile
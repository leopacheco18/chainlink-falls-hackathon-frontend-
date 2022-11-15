import React from 'react'
import logoMini from '../../assets/image/logo-mini.png'
import logoMatic from '../../assets/image/logo-matic.png'
import './index.css'
import Title from '../Title'
import { Button } from 'antd'
import {IoMdChatboxes} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import useHttp from '../../hooks/useHttp'
import { useAddress } from '@thirdweb-dev/react'

const ProductInfo = ({name, owner, price, description, hideButton, tokenId}) => {
    const navigate = useNavigate();
    const address = useAddress();
    const { loading, request } = useHttp();
    const shortAddress = () => {
        if (owner) {
          return (
            owner.slice(0, 4) +
            "..." +
            owner.slice(owner.length - 4, owner.length)
          );
        } else {
          return "";
        }
      };

  const createChat = async () => {
    const res = await request({type: "post", endpoint: "create-chat", data: { owner, buyer: address, tokenId }})
  }
  return (
    <div>
        <h2 className='product-info-title'>{name}</h2>
        <div className='d-flex vertically-center header-profile'>
                <img alt='logo-mini' src={logoMini} />
                <p onClick={() => navigate(`/profile/${owner}`)}> {shortAddress()} </p>
        </div>
        
        <div className='d-flex vertically-center product-info-price'>
                <img alt='logo-mini' src={logoMatic} />
                <p> {price} </p>
        </div>
        <Title  name={'Description'} fontSize={'1.25rem'} />
        <p className='product-info-description'>{description}</p>
        {!hideButton && address && 
        <Button block size='large' className='product-info-btn-chat' onClick={createChat}> <IoMdChatboxes /> Chat </Button>}
    </div>
  )
}

export default ProductInfo
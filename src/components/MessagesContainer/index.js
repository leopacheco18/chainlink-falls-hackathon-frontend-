import { ClockCircleOutlined } from '@ant-design/icons';
import { useAddress } from '@thirdweb-dev/react'
import React from 'react'
import './index.css'

const MessagesContainer = ({messages}) => {

    const address = useAddress();

  return (
    <div className='chat-container'>
        {messages.map((message, key) => 
        <div className={message.from === address  ? "chat-item-right" : 'd-flex'} key={key}>
            <div  className={`chat-item`}>
            <p>{message.message}</p>
            <small> <ClockCircleOutlined /> {message.date} </small>
        </div>
        </div>)}
    </div>
  )
}

export default MessagesContainer
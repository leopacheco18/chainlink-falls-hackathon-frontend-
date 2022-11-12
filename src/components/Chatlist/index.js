import React from 'react'
import chatList from '../../mocks/ChatList.json'
import ChatItem from '../ChatItem'
import './index.css'
const Chatlist = ({chatSelected, setChatSelected}) => {

  return (
    <div className='chat-list-container'>
      {chatList.map((item, key) => (
        <ChatItem key={key} {...item}  onClick={() => setChatSelected(item)}  chatSelected={chatSelected} />
      ))}
    </div>
  )
}

export default Chatlist
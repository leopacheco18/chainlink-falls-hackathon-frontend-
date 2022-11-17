import { useAddress } from '@thirdweb-dev/react'
import React, { useEffect, useState } from 'react'
import useHttp from '../../hooks/useHttp'
import ChatItem from '../ChatItem'
import Loading from '../Loading'
import './index.css'
const Chatlist = ({chatSelected, setChatSelected}) => {
  const [chatList, setChatList] = useState([])
  const {loading, request}=useHttp();
  const address = useAddress();

  useEffect(() => {
    if(address){
      getChats();
    }else{
      setChatList([])
    }
  },[address])

  const getChats = async () => {
    const res = await request({endpoint: `get-chats/${address}`});
    setChatList(res)
    if(localStorage.getItem('chatId')){
      res.forEach(item => {
        if(item._id === localStorage.getItem('chatId')){
          setChatSelected(item)
        }
      })
      localStorage.removeItem('chatId')
    }
  }

  return (
    <div className='chat-list-container'>

{loading && <Loading />}
      {chatList.map((item, key) => (
        <ChatItem key={key} {...item}  onClick={() => setChatSelected(item)}  chatSelected={chatSelected} />
      ))}
    </div>
  )
}

export default Chatlist
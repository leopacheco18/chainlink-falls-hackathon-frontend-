import { useAddress } from '@thirdweb-dev/react';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import ChatContent from '../../components/ChatContent';
import Chatlist from '../../components/Chatlist';
import './Chat.css'

const Chat = ({socket, pushMessage, setPushMessage}) => {
  const [height , setHeight] = useState(0);
  const [chatSelected, setChatSelected] = useState()
  const address = useAddress();

  useEffect(() => {
    setHeight(document.getElementById('header').offsetHeight)
  }, [])



  const sendMessage = (msg) => {
    socket.send(JSON.stringify({from: address,action: 'sendMessage', address:  (chatSelected.owner === address ? chatSelected.buyer : chatSelected.owner), message: msg, productId: chatSelected.tokenId}))
  }

  return (
    <Row style={{height: `calc(100vh - ${height}px)`}}>
      <Col span={7} className='border-right-green m-h-100'>
        <Chatlist setChatSelected={setChatSelected} chatSelected={chatSelected} />
      </Col>
      <Col span={17} className='h-100'>
        <ChatContent pushMessage={pushMessage}  setPushMessage={setPushMessage} chatSelected={chatSelected} sendMessage={sendMessage} />
      </Col>
    </Row>
  )
}

export default Chat
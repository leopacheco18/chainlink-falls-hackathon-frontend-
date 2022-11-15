import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import ChatContent from '../../components/ChatContent';
import Chatlist from '../../components/Chatlist';
import './Chat.css'

const Chat = ({socket}) => {
  const [height , setHeight] = useState(0);
  const [chatSelected, setChatSelected] = useState()

  useEffect(() => {
    setHeight(document.getElementById('header').offsetHeight)
  }, [])


  const sendMessage = (msg) => {

  }

  return (
    <Row style={{height: `calc(100vh - ${height}px)`}}>
      <Col span={7} className='border-right-green m-h-100'>
        <Chatlist setChatSelected={setChatSelected} chatSelected={chatSelected} />
      </Col>
      <Col span={17}>
        <ChatContent chatSelected={chatSelected} />
      </Col>
    </Row>
  )
}

export default Chat
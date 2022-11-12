import { Col, Row } from 'antd'
import React from 'react'
import "./index.css"
const ChatItem = ({image, name, owner, lastMsg , status, id_chat, onClick, chatSelected}) => {
    
  return (
    <div className={`chat-item-container ${chatSelected && chatSelected.id_chat === id_chat ? "chat-selected" : ""}`} onClick={onClick}>
        <Row gutter={10}>
            <Col span={4}>
                <img alt='product' src={image} className='chat-image' />
            </Col>
            <Col span={20}>
                <Row> 
                    <Col span={18}>
                        <p className='chat-name'>{name}</p>
                    </Col>
                    <Col span={6}>
                        <div className='chat-status' style={{borderColor: (status ? '#B1EE73' : '#EE7373')}}>
                            {status ? 'Available' : 'Sold Out'}
                        </div>
                    </Col>
                </Row>
                <Row> 
                    <Col span={24}>
                        <p className='chat-lastmsg'>{lastMsg}</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
  )
}

export default ChatItem
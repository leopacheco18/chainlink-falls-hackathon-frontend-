import { useAddress } from '@thirdweb-dev/react'
import { Col, Row } from 'antd'
import React from 'react'
import "./index.css"
const ChatItem = ({image, name, owner, buyer, lastMsg , status, _id, onClick, chatSelected}) => {
    const address = useAddress();
    
    const shortAddress = (address) => {
        
        return (
            address.slice(0, 4) +
            "..." +
            address.slice(address.length - 4, address.length)
          );
      };
  return (
    <div className={`chat-item-container ${chatSelected && chatSelected._id === _id ? "chat-selected" : ""}`} onClick={onClick}>
        <Row gutter={10}>
            <Col span={4}>
                <img alt='product' src={image} className='chat-image' />
            </Col>
            <Col span={20}>
                <Row> 
                    <Col span={18}>
                        <p className='chat-name'>{name}</p>
                        <p className='chat-address'>{address === owner ? shortAddress(buyer) : shortAddress(owner)}</p>
                    </Col>
                    <Col span={6}>
                        <div className='chat-status' style={{borderColor: (status ? '#B1EE73' : '#EE7373')}}>
                            {status ? 'Available' : 'Not for Sale'}
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
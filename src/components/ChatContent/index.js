import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import React from "react";
import "./index.css";
const ChatContent = ({ chatSelected }) => {
  if (!chatSelected) {
    return <div className="no-chat-selected"></div>;
  }

  return (
    <div className="no-chat-selected">
        <div className="close-chat">
            <DeleteOutlined />
        </div>
        <div className="generate-random-number-chat">
            Generate Random Number
        </div>
      <div className="chat-content-container">
        <div className="chat-messages-container">Test</div>
        <div className="chat-box-container">
          <Row>
            <Col span={22}>
                <Input.TextArea placeholder="Message..." />
            </Col>
            <Col span={2}>
                <SendOutlined />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;

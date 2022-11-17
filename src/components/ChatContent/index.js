import { SendOutlined } from "@ant-design/icons";
import { useAddress} from "@thirdweb-dev/react";
import { Col, Input, notification, Row } from "antd";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import MessagesContainer from "../MessagesContainer";
import abiLink from '../../mocks/AbiLink.json'
import "./index.css";
import AbiOpenMarket from '../../mocks/AbiOpenMarket.json'
import Loading from "../Loading";
const ChatContent = ({ chatSelected, sendMessage , pushMessage, setPushMessage}) => {

  const [ msg , setMsg] = useState('');
  const [messages, setMessages] = useState([])
  const [buyerBalance, setBuyerBalance] = useState(0)
  const { request } = useHttp()
  const [loading, setLoading] = useState(false)
  const address = useAddress();

  useEffect(() => {
    if(pushMessage && chatSelected && chatSelected.tokenId === pushMessage.productId && (chatSelected.owner === pushMessage.from || chatSelected.buyer === pushMessage.from)){
      pushNewMsg(pushMessage)
      setPushMessage()
    }
  }, [pushMessage])

  useEffect(() => {
    setMsg('')
    if(chatSelected){
      getBuyerBalance();
    getMessages();
    }
  }, [chatSelected])

  const getBuyerBalance = async () => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum
    );
    const buyerAddress = chatSelected.buyer;
    const balance = await provider.getBalance(buyerAddress)
    setBuyerBalance(ethers.utils.formatUnits(balance, 18));
  }

  const getFormatDate = (dateStr) => {
    const date = new Date(dateStr);

    let month = date.getMonth() + 1;
    let day = date.getDay();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    if(month < 10) month = '0' + month
    if(day < 10) day = '0' + day
    if(hour < 10) hour = '0' + hour
    if(minutes < 10) minutes = '0' + minutes
    return [year, month,day].join('-') + ' ' + [hour, minutes].join(':')
  }

  const getMessages = async () => {
    setLoading(true)
    const msgList = await request({endpoint: `get-messages/${chatSelected._id}`});
    msgList.forEach(item => {
      item.date = getFormatDate(item.date)
    })
    setMessages(msgList)
    setLoading(false)
  }

  const pushNewMsg = (newMsg) => {
    let aux = [...messages];
      aux.push(newMsg);
      setMessages(aux)
  }

  const sendNewMsg = async () => {

    pushNewMsg({
      chatId: chatSelected._id,
      from: address,
      message: msg,
      date: getFormatDate(new Date())
    })
    setMsg('')
    await request({type: 'post' , endpoint: 'add-msg', data: {
      chatId: chatSelected._id,
      from: address,
      message: msg
    }})
    sendMessage(msg)
  }

  const handleKey = (e) => {
    if(e.keyCode === 13){
      e.preventDefault();
      sendNewMsg();
    }
  }

  const generateRandom = async () => {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(
      window.ethereum
    );

    const signer = provider.getSigner();

    const LINK_ADDRESS = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

    const LINK = new ethers.Contract(LINK_ADDRESS, abiLink, signer);
    const balance = await LINK.balanceOf(address);
    const feePrice = 0.001
    if(ethers.utils.formatUnits(balance, 18) < feePrice){
      notification.error({
        message: "You don't have enough link",
        description: `You need at least ${feePrice} Link to generate a random number`
      })
      return;
    }

    try {
      await LINK.transfer(process.env.REACT_APP_CONTRACT_ADDRESS, ethers.utils.parseEther(feePrice.toString()));

    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      AbiOpenMarket,
      signer
    );

    await contract.getRandomNumber(
      chatSelected.buyer,
      chatSelected.tokenId.toString()
    );

    notification.success({
      message: 'Random number generate successfully'
    })
    } catch (error) {
      notification.error({
        message: 'Metamask rejected'
      })
    }

    setLoading(false)
   }
  
  if (!chatSelected) {
    return <div className="no-chat-selected"></div>;
  }
  return (
    <div className="no-chat-selected">

{loading && <Loading />}
        {address === chatSelected.owner && chatSelected.status &&
         <div onClick={generateRandom} className="generate-random-number-chat">
            {buyerBalance >= parseFloat(chatSelected.priceMatic) ? 'Generate Random Number' : "User doesn't have enough money"}
        </div>}
      <div className="chat-content-container">
        <div className="chat-messages-container">
          <MessagesContainer messages={messages} />
        </div>
        <div className="chat-box-container">
          <Row>
            <Col span={22}>
                <Input.TextArea onKeyDown={handleKey} placeholder="Message..." value={msg} onChange={(e) => setMsg(e.target.value)} />
            </Col>
            <Col span={2}>
                <SendOutlined onClick={sendNewMsg} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;


import Home from "./pages/home/Home";

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Chat from "./pages/chat/Chat";
import Footer from "./components/Footer";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import Product from "./pages/product/Product";
import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { notification} from 'antd'
import Transactions from "./pages/transactions/Transactions";
import ProductByCategory from "./pages/productByCategory/ProductByCategory";

const App = () => {
  const [ socket, setSocket ] = useState();
  const [ pushMessage, setPushMessage ] = useState()
  const address = useAddress();

  useEffect(() => {
    if(address){
      connectSocket();
    }else{
      closeSocket();
    }
  
    return () => {
      closeSocket()
    }
  }, [address])


  const getFormatDate = () => {
    const date = new Date();

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

  const connectSocket = () => {
    let socketObj = new WebSocket('wss://t52gzmy9z9.execute-api.us-east-1.amazonaws.com/develop')
    socketObj.onopen = () => {
      socketObj.send(JSON.stringify({action : "setAddress", address: address}))
    }
    socketObj.onmessage = (msg) => {
      const data = JSON.parse(msg.data)
      if(data.from){

        notification.info({
          message: 'New Message',
          description:
            data.message,
        });
        setPushMessage({
          from: data.from,
          message: data.message,
          productId: data.productId,
          date: getFormatDate()
        })
      }
    }
    setSocket(socketObj)
  }

  const closeSocket = () => {
    if(socket){
      socket.close();
      setSocket()
    }
  }
  

  return (
    <div className="app">
      <Router>
            <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat socket={socket} pushMessage={pushMessage} setPushMessage={setPushMessage} />} />
            <Route path="/profile/:address" element={<Profile />} />
            <Route path="/search/:search" element={<Search />} />
            <Route path="/category/:category" element={<ProductByCategory />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        
        <Footer />
      </Router>
    </div>
  );
};


export default App;


import Home from "./pages/home/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Chat from "./pages/chat/Chat";
import Footer from "./components/Footer";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import Product from "./pages/product/Product";
import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

const App = () => {
  const [ socket, setSocket ] = useState();
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

  const connectSocket = () => {
    let socketObj = new WebSocket('wss://t52gzmy9z9.execute-api.us-east-1.amazonaws.com/develop')
    socketObj.onopen = () => {
      console.log('Se conecto')
      socketObj.send(JSON.stringify({action : "setAddress", address: address}))
    }
    setSocket(socketObj)
  }

  const closeSocket = () => {
    if(socket){
      alert('close')
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
            <Route path="/chat" element={<Chat socket={socket} />} />
            <Route path="/profile/:address" element={<Profile />} />
            <Route path="/search/:search" element={<Search />} />
            <Route path="/product/:productId" element={<Product />} />
          </Routes>
        
        <Footer />
      </Router>
    </div>
  );
};


export default App;

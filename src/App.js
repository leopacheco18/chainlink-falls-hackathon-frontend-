
import Home from "./pages/home/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Chat from "./pages/chat/Chat";
import Footer from "./components/Footer";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import Product from "./pages/product/Product";

const App = () => {

  return (
    <div className="app">
      <Router>
            <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
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

import { useEffect } from "react";

import { connect } from "react-redux";

import { receiveProductsRequest } from "./store/product/actions";

import Home from "./pages/home/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Chat from "./pages/chat/Chat";

const App = ({ products, receiveProducts }) => {
  useEffect(() => {
    receiveProducts();
  }, []);

  return (
    <div className="app">
      <Router>
            <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.product,
});

const mapDispatchToProps = (dispatch) => ({
  receiveProducts: () => dispatch(receiveProductsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

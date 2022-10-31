import { useEffect } from "react";

import { connect } from "react-redux";

import { receiveProductsRequest } from "./store/product/actions";

const App = ({ products, receiveProducts }) => {

  useEffect(() => {
    receiveProducts()
  }, [])

  return (
    <div className="app">
      Hello
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.product
})

const mapDispatchToProps = dispatch => ({
  receiveProducts: () => dispatch(receiveProductsRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

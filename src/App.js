import React, { useState } from "react";
import "./App.css";
import Cart from "./Cart";
import Loader from "./Loader";
import ProductList from "./ProductList";
import { useProducts } from "./services/ProductService";

function App() {
  const [filter, setFilter] = useState("");
  const { loading, data: products, reFetch } = useProducts(filter);
  const [cartProducts, setCartProducts] = useState([]);

  const addItemToCart = product => {
    let currentProduct = cartProducts.find(item => item.id === product.id);
    let quantity = 1;
    if (currentProduct) {
      quantity = currentProduct.quantity + 1;
    }
    setCartProducts([
      ...cartProducts.filter(item => item.id !== product.id),
      { ...product, quantity }
    ]);
  };

  return (
    <div className="App">
      <div id="product-list">
        {loading ? (
          <Loader />
        ) : (
          <ProductList products={products} addToCart={addItemToCart} />
        )}
      </div>
      <button onClick={reFetch}>Refetch Products</button>
      <input type="text" onBlur={e => setFilter(e.target.value)} />
      <br />
      <hr />
      <Cart products={cartProducts} />
    </div>
  );
}

export default App;

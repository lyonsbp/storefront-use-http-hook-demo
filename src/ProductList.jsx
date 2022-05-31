import React from 'react'

function ProductList({ addToCart, products }) {

  const handleAddToCart = (id) => {
    const productToAdd = products.find(product => product.id === id)
    if (productToAdd) addToCart(productToAdd)
  }

  return products.map(product => (
    <div key={product.name}>
      <h2>{product.name}</h2>
      <h3>{product.price}</h3>
      <p>{product.category}</p>
      <button onClick={() => handleAddToCart(product.id)}>Add To Cart</button>
    </div>
  ))
}

export default ProductList
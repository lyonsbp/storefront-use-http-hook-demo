import React from 'react'

function Cart({ products }) {
  return products.map(product => (
    <div key={product.name}>
      <h2>{product.name} x {product.quantity}</h2>
      <h3>{product.price}</h3>
      <p>{product.category}</p>
    </div>
  ))
}

export default Cart
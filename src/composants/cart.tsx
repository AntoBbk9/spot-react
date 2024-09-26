import React from 'react'

    function Cart({ cart }) {
        return (
          <div className="cart">
            <h2>Your Card</h2>
            {cart.length === 0 ? (
              <p>Votre panier est vide</p>
            ) : (
              <ul>
                {cart.map((product, index) => (
                  <li key={index}>
                    <img src={product.images} alt={product.title} className="w-20 h-20" />
                    <p>{product.title}</p>
                    <p>{product.regularPrice}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }

export default Cart
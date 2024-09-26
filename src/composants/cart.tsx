
import React from 'react';

// Définir une interface pour le produit
interface Product {
  id: number;
  images: string;
  title: string;
  regularPrice: string;
}


interface CartProps {
  cart: Product[];
}

function Cart({ cart }: CartProps) {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <ul>
          {cart.map((product: Product, index: number) => (
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

export default Cart;

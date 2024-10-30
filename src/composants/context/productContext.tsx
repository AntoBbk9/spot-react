import React, { useContext } from 'react';
import { Product } from '../typeProduct';

interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  cartCount: number;
  incrementQuantite: (productId: string) => void;
  decrementQuantite: (productId: string) => void;
  removeFromCart: (productId: string) => void;
}

export const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

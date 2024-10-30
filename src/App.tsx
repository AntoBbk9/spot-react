import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Articles from './pages/layout';
import ArticlesLists from './composants/articleslists';
import ArticleItem from './composants/articleitem';
import SearchProduit from './pages/searchProduit';
import Payment from './pages/payment';
import CartPage from './composants/cart';
import { useEffect, useState } from 'react';
import { CartContext } from './composants/context/productContext';
import { CartContextType } from './composants/context/productContext';
import { Product } from './composants/typeProduct';

function App() {
  const initialCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const [cartItems, setCartItems] = useState<CartContextType['cartItems']>(initialCartItems);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const findProductIndex = (productId: string) => {
    return cartItems.findIndex(item => item.product.id === productId);
  };

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingProductIndex = findProductIndex(product.id);
      if (existingProductIndex !== -1) {
        return prevItems.map((item, index) => 
          index === existingProductIndex 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const incrementQuantite = (productId: string) => {
    setCartItems((prevItems) => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const decrementQuantite = (productId: string) => {
    setCartItems((prevItems) => 
      prevItems.map(item => {
        if (item.product.id === productId) {
          const newQuantity = item.quantity - 1;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log(cartItems);
  }, [cartItems]);

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter(item => item.product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount, incrementQuantite, decrementQuantite, removeFromCart }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Articles />} >
            <Route index element={<ArticlesLists />} />
            <Route path="articles/:id_product" element={<ArticleItem />} />
            <Route path="card" element={<CartPage />} />
          </Route>
          <Route path="search" element={<SearchProduit />} />
          <Route path="payment" element={<Payment />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;

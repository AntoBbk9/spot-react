import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Articles from './pages/layout';
import ArticlesLists from './composants/articleslists';
import ArticleItem from './composants/articleitem';
import SearchProduit from './pages/searchProduit';
import Payment from './pages/payment';
import CartPage from './composants/cart';
import { CountContext } from './composants/context/countContext';
import { useEffect, useState } from 'react';
import { CartContext } from './composants/context/productContext';
import { CartContextType } from './composants/context/productContext';
import { Product } from './composants/typeProduct';

function App() {
  const [count, setCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartContextType['cartItems']>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingProductIndex = prevItems.findIndex(item => item.product.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingProductIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cartItems, addToCart, cartCount }}>
        <CountContext.Provider value={{ count, increment, decrement }}>
          <Routes>
            <Route path="/" element={<Articles />}>
              <Route index element={<ArticlesLists />} />
              <Route path="articles/:id_product" element={<ArticleItem />} />
              <Route path="card" element={<CartPage />} />
            </Route>
            <Route path="search" element={<SearchProduit />} />
            <Route path="payment" element={<Payment />} />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </CountContext.Provider>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { Product } from './typeProduct';
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';
import Button from './button';

interface CartItem {
  product: Product;
  quantity: number;
}

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
  }, []);

  const handleRemove = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleQuantityChange = (index: number, amount: number) => {
    const updatedCartItems = [...cartItems];
    const newQuantity = updatedCartItems[index].quantity + amount;

    if (newQuantity > 0) {
      updatedCartItems[index].quantity = newQuantity;
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  const extractPrice = (priceString: string) => {
    const priceMatch = priceString.match(/[\d.,]+/);
    return priceMatch ? parseFloat(priceMatch[0].replace(',', '.')) : 0;
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + extractPrice(item.product.regularPrice) * item.quantity,
    0
  );

  return (
    <div className="container mx-auto pt-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Votre panier</h1>
        <Link to="/" className="underline">Continuer vos achats</Link>
      </div>
      <div className="flex justify-between border-b py-3">
        <p className="text-gray-300 text-sm">PRODUIT</p>
        <p className="text-gray-300 text-sm">QUANTITÉ</p>
        <p className="text-gray-300 text-sm">TOTAL</p>
      </div>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => {
            const itemTotalPrice = extractPrice(item.product.regularPrice) * item.quantity;
            return (
              <div key={index} className="flex justify-between py-3">
                <div className="flex">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-28 h-32 rounded object-cover mr-4"
                  />
                  <div>
                    <p className="text-sm">{item.product.title}</p>
                    <p className="text-sm">{item.product.regularPrice}</p>
                  </div>
                </div>
                <div className='flex gap-2 h-10'>
                  <div className="flex justify-around rounded-md w-32 border border-1 border-black py-2">
                    <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                  </div>
                  <button onClick={() => handleRemove(index)}>
                    <RiDeleteBinLine />
                  </button>
                </div>
                <p>${itemTotalPrice.toFixed(2)}</p>
              </div>
            );
          })}
          <div className="flex justify-end mt-4 border-t pt-6">
            <p>Sous-total : ${totalPrice.toFixed(2)} CAD</p>
          </div>
          <p className='text-right text-sm'>Taxes and shipping calculated at checkout</p>
          <div className="flex justify-end mt-4">
            <Link to="/payment">
              <Button children='Check out' color='primary' />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;

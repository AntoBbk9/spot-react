import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';
import Button from './button';
import { CartContext } from './context/productContext';

function CartPage() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartPage must be used within CartContext provider");
  }

  const { cartItems, incrementQuantite, decrementQuantite, removeFromCart } = cartContext;

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
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <Link to="/" className="underline">Continue Shopping</Link>
      </div>
      <div className="flex justify-between border-b py-3">
        <p className="text-gray-300 text-sm w-1/2">PRODUIT</p>
        <p className="text-gray-300 text-sm">QUANTITÉ</p>
        <p className="text-gray-300 text-sm">TOTAL</p>
      </div>
      {cartItems.length === 0 ? (
        <p>Your Cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => {
            const itemTotalPrice = extractPrice(item.product.regularPrice) * item.quantity;
            return (
              <div key={index} className="flex justify-between py-3">
                <div className="flex w-1/2">
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
                    <button onClick={() => decrementQuantite(item.product.id)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => incrementQuantite(item.product.id)}>+</button>
                  </div>
                  <button onClick={() => {
                      if (window.confirm("Are you sure you want to remove this item from your cart?")) {
                        removeFromCart(item.product.id);
                      }}}> 
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

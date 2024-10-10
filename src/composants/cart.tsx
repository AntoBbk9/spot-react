import { Link } from "react-router-dom";
import { Product } from "./typeProduct";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  onRemove: (id: number) => void; // Fonction pour supprimer un article du panier
}

function CartPage({ cartItems, onRemove }: CartPageProps) {
  const totalPrice = cartItems.reduce((total, item) => total + item.product.regularPrice * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b py-2">
              <div className="flex items-center">
                <img src={item.product.images[0]} alt={item.product.title} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <p>{item.product.title}</p>
                  <p>${item.product.regularPrice} x {item.quantity}</p>
                </div>
              </div>
              <button onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700">
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <p className="font-bold">Subtotal:</p>
            <p className="font-bold">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mt-4">
            <Link to="/" className="text-blue-500 hover:underline">Continue shopping</Link>
            <Link to="/payment">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;

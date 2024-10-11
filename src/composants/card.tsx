import { Link } from "react-router-dom";
import Button from "./button";
import { Product } from "./typeProduct";


function PopupCart({ product, cartCount, onClose }: { product: Product; cartCount: number; onClose: () => void }) {
  return (
    <div className="absolute top-28 right-28 w-80 bg-white border border-black rounded p-4 z-50">
      <div className="flex justify-between items-center border-b pb-2">
        <p className="">Item added to your cart </p>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          &times;
        </button>
      </div>
      <div className="flex gap-4 py-4 justify-center">
        <img src={product.images[0]} alt={product.title} className="w-16 h-16 object-cover rounded" />
        <div>
          <p>{product.title}</p>
          <p className="text-gray-500">{product.regularPrice}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2 justify-center">
        <Link to='/card'><Button children={`View my cart (${cartCount})`} color="secondary" /></Link>
        <Link to='/payment'><Button children="Check out" color='primary' /></Link>
        <a className="underline text-center">Continue shopping</a>
      </div>
    </div>
  );
}

export default PopupCart;

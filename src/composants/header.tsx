import { IoSearchOutline } from "react-icons/io5";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useCartContext } from "./context/productContext";

function Header() {

  const { cartCount } = useCartContext();

   return (
    <div className='flex justify-between'>
      <Link to='/'>
        <img src="/logo40.png" alt="photo du logo" className='w-24 h-10'/>
      </Link>
      <div className='flex gap-2'>
        <Link to='/search'>
          <IoSearchOutline className="w-6 h-6"/>
        </Link>
        <Link to='/card' className="relative">
          <BsHandbag className="w-6 h-6"/>
          {cartCount > 0 && (
            <span className="absolute -top-[-15px] -right-2 bg-yellow-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Header;

import { IoSearchOutline } from "react-icons/io5";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";

function Header({ cartCount }: { cartCount: number }) {
  return (
    <div className='flex justify-between '>
        <img src="/logo40.png" alt="photo du logo" className='w-24 h-10'/>
        <div className='flex gap-2'>
          <Link to='/search'><IoSearchOutline /></Link>
          <div>
          <BsHandbag />
          <div>
            {cartCount}
          </div>
          </div>
        </div>
      </div>
  )
}

export default Header
import { IoSearchOutline } from "react-icons/io5";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className='flex justify-between '>
      <Link to='/'>
        <img src="/logo40.png" alt="photo du logo" className='w-24 h-10'/>
      </Link>
        <div className='flex gap-2'>
          <Link to='/search'><IoSearchOutline /></Link>
          <Link to='/card'>
            <BsHandbag />
          </Link>
        </div>
      </div>
  )
}

export default Header
import { BsHandbag } from "react-icons/bs";

function Payment() {
  return (
    <div className="w-[40rem] m-auto py-10">
        <div className='flex justify-between '>
        <img src="/logo40.png" alt="photo du logo" className='w-24 h-10'/>
        <div className='flex gap-2'>
          <BsHandbag />
        </div>
      </div>
    </div>
  )
}

export default Payment;
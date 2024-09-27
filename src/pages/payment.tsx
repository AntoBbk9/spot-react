import { BsHandbag } from "react-icons/bs";

function Payment() {
  return (
    <div>
        <div className="w-[40rem] m-auto py-10">
            <div className='flex justify-between '>
            <img src="/logo40.png" alt="photo du logo" className='w-24 h-10'/>
            <div className='flex gap-2'>
            <BsHandbag />
            </div>
        </div>
        </div>
        <hr className="w-full px-5"/>
        <h1>Contact</h1>
        <form action="">
            <input type="text" placeholder="Enter Your Mobile Number" className="my-2 w-1/3 border border-gray-300 rounded-md px-4 py-2 outline-none" />
            <div>
                <label>
                    <input type="checkbox" name="products" value="produit1"/>Email me with news and offers
                </label>
            </div>    
            <p>Delivery</p>
            <select name="" id=""  className="my-2 w-1/3 border border-gray-300 rounded-md px-4 py-2 outline-none">
                    <option value="">United State(CAD $)</option>
                    <option value="">Canada(CAD $)</option>
                    <option value="">Australia(AUD $)</option>
                    <option value="">UK(GBP $)</option>
                    <option value="">New Zealand(NZD $)</option>
                    <option value="">Singapore(SGD $)</option>
                    <option value="">Malaysia(MYR $)</option>
                    <option value="">Philippines(PHP $)</option>
                    <option value="">Indonesia(IDR $)</option>
                    <option value="">Thailand(THB $)</option>
                    <option value="">Vietnam(VND $)</option>
                    <option value="">Korea(KRW $)</option>
                    <option value="">Japan(JPY $)</option>
                    <option value="">China(CNY $)</option> 
                </select>
                <div className="flex gap-2">
                    <input type="text" placeholder="First name(optional)" className="my-2 w-[16.3%] border border-gray-300 rounded-md px-4 py-2 outline-none"/>
                    <input type="text" placeholder="Last name" className="my-2 w-[16.3%] border border-gray-300 rounded-md px-4 py-2 outline-none"/>
                </div>
                <input type="text" placeholder="Adress" className="my-2 w-1/3 border border-gray-300 rounded-md px-4 py-2 outline-none" /><br />
                <input type="text" placeholder="Apartment, suit, etc. (optional)" className="my-2 w-1/3 border border-gray-300 rounded-md px-4 py-2 outline-none" /><br />
                <input type="text" placeholder="Enter Your Mobile Number" className="my-2 w-1/3 border border-gray-300 rounded-md px-4 py-2 outline-none" />
                <div className="flex gap-2">
                    <input type="text" placeholder="City" className="my-2 w-[10.7%] border border-gray-300 rounded-md px-4 py-2 outline-none"/>
                    <select name="" id=""  className="my-2 w-[10.7%] border border-gray-300 rounded-md px-4 py-2 outline-none">
                        <option value="">United State(CAD $)</option>
                        <option value="">Canada(CAD $)</option>
                        <option value="">Australia(AUD $)</option>
                        <option value="">UK(GBP $)</option>
                        <option value="">New Zealand(NZD $)</option>
                        <option value="">Singapore(SGD $)</option>
                        <option value="">Malaysia(MYR $)</option>
                        <option value="">Philippines(PHP $)</option>
                        <option value="">Indonesia(IDR $)</option>
                        <option value="">Thailand(THB $)</option>
                        <option value="">Vietnam(VND $)</option>
                        <option value="">Korea(KRW $)</option>
                        <option value="">Japan(JPY $)</option>
                        <option value="">China(CNY $)</option> 
                    </select>
                    <input type="text" placeholder="ZIP code" className="my-2 w-[10.7%] border border-gray-300 rounded-md px-4 py-2 outline-none"/>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="products" value="produit1"/>Save this information for next time
                    </label>
                </div>
        </form>
    </div>
  )
}

export default Payment;
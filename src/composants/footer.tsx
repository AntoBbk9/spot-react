import { FaFacebookSquare, FaInstagram, FaRegCopyright, FaTiktok, FaYoutube } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";

function Footer() {
  return (
    <div>
        <hr />
        <div className="flex flex-col items-center pb-8 py-10">
            <img src="/logo-small.png" alt="" className="w-12 h-18"/>
            <p className="text-sm font-bold">A brand that strives to inspire and push creative culture forward.</p>
            <p className="w-[40rem] text-center mt-5 text-sm">We approach our work the mentality that every product made
                is a a learning experience to improve our craft. We are 
                practitioners and purveyors of creative culture and are inspired 
                by its various forms art, design, fashion, music, film, food, and more.</p>
            <div className="flex gap-5 pt-3">
                <FaFacebookSquare />
                <FaInstagram />
                <FaYoutube />
                <FaTiktok />
                <TiSocialTwitter />
            </div>    
        </div>   
        <hr />
        <div className="flex justify-between items-center w-full px-24 pb-10">
            <div className="pt-8">
                <p>Country/region</p>
                <select name="" id=""  className="p-3 border border-black border-1 rounded mt-2 outline-none text-center">
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
                <div className="flex gap-2 items-center mt-6">
                    <FaRegCopyright className="w-4 h-4"/>
                    <p className="text-sm">2024, theme-spotligth-demo Powered by Shopify</p>
                </div>
            </div>
            <div className="flex gap-3">
                <img src="/logo-visa.png" alt="" className="w-10 h-6 drop-shadow"/>
                <img src="/mastercard.png" alt="" className="w-10 h-6 drop-shadow"/>
                <img src="/images.png" alt="" className="w-10 h-6 drop-shadow"/>
                <img src="/imagesPP.png" alt="" className="w-10 h-6 drop-shadow"/>
                <img src="/logo-disc.png" alt="" className="w-10 h-6 drop-shadow"/>
            </div>
        </div>
    </div>
  )
}

export default Footer
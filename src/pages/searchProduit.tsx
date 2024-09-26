import { FaSearch } from "react-icons/fa"
import ArticlesLists from "../composants/articleslists"
import Footer from "../composants/footer"
import { RxCross2 } from "react-icons/rx"
import { useState } from "react";

function SearchProduit() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div>
      <div className='w-[40rem] m-auto py-10'>
        <div>
          <form id="search-product-form" role="search">
            <div className="flex gap-2 items-center ml-24">
              <div className="flex justify-between items-center w-[24rem] border border-1 border-black rounded-md px-3 py-2">
                <input
                  id="product-search"
                  aria-label="Search products"
                  placeholder="Rechercher un produit"
                  type="search"
                  onChange={inputHandler}
                  name="query"
                  className="outline-none border-none"
                />
                <button type="submit"><FaSearch /></button>
              </div>
              <RxCross2 />
            </div>

            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
        </div>
        <ArticlesLists inputText={inputText} />
      </div>
      <Footer />
    </div>
  )
}

export default SearchProduit
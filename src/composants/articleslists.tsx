import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ArticleProps {
    id: number;
    images: string;
    properties: string;
    title: string;
    regularPrice: string;

}

function ArticlesLists() {
    const [products, setProducts] = useState<ArticleProps[]>([]); 
    const [loading, setLoading] = useState<boolean>(false); 

    async function fetchProducts () {
        try {
          setLoading(true); 
          const response = await axios.get('http://localhost:3000/products');
          const data = response.data; 

          setProducts(data); 
          
          setLoading(false); 
        } catch (error) {
          console.log(error); 
        //   return <h1>Error</h1>
      };
    }

    useEffect(() => {
      fetchProducts(); 
    }, []); 
  
    if (loading) {
      return <p>Chargement...</p>;
    }
  
    return (
      <div>
        <ul className="grid grid-cols-4 gap-3 pt-6">
          {products.map((product, index) => (
             index % 2 === 0 && (
            <li key={product.id}>
                <Link to={`/articles/${product.id}`} className="">
                <img src={product.images} alt="image du produit" className='w-40 h-40 rounded-lg mt-5'/>
                <p className='text-xs'>{product.title}</p>
                <p className='text-sm font-bold'>{product.regularPrice}</p>
                </Link>
            </li>)
          ))}
        </ul>
      </div>
    )
}

export default ArticlesLists
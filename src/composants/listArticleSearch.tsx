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

function ArticlesListsSearch({ inputText }: {inputText: string;}) {
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
      };
    }

    useEffect(() => {
      fetchProducts(); 
    }, []); 
  
    if (loading) {
      return <p>Chargement...</p>;
    }
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(inputText.toLowerCase()) 
    );

    return (
        <div>
            {filteredProducts.length > 0 ? (
            <ul className="grid grid-cols-4 gap-3 pt-6">
            {filteredProducts.map((product, index) => (
            index % 2 === 0 && (
            <li key={product.id}>
                <Link to={`/articles/${product.id}`} className="">
                <img src={product.images} alt="image du produit" className="w-40 h-40 rounded-lg mt-5" />
                <p className="text-xs">{product.title}</p>
                <p className="text-sm font-bold">{product.regularPrice}</p>
                </Link>
            </li>)
            ))}
            </ul>) : (
            <p>Aucun produit ne correspond à votre recherche.</p>
            )}
        </div>
    )
}

export default ArticlesListsSearch
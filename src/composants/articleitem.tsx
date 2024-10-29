import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Button from './button';
import { FaArrowLeft } from 'react-icons/fa';
import PopupCart from './card';
import { Product } from './typeProduct';
import { useCartContext } from './context/productContext';
import { CountContext } from './context/countContext';

function ArticleItem() {
  const { id_product } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);
  const { count, increment, decrement } = useContext(CountContext) || { count: 1, increment: () => {}, decrement: () => {} }; // Utiliser le CountContext
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
  const { addToCart, cartCount } = useCartContext();

  const apiUrl = import.meta.env.VITE_SERVER_URLL;
  
  async function fetchProduct() {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/${id_product}`);
      setProduct(response.data); 
      setLoading(false);
    } catch (err) {
      setError("Erreur lors de la récupération du produit.");
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id_product]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, count);
      setIsPopupVisible(true);
    }
  };  

  return (
    <div className='pt-6'>
      <Link to={"/"}>
        <FaArrowLeft className='mb-2'/>
      </Link>
      {product && (
        <div className='flex gap-6'>
          <div>
            <ul>
              {product.images.map((image, index) => {
                const className = index === 0 ? 'w-[40rem]' : 'w-52 pt-6';
                return (
                  <li key={index} className={className}>
                    <img src={image} alt={product.title} className='rounded'/>
                  </li>
                );
              })}
            </ul>   
          </div>
          <div className='w-60'>
            <h1 className='text-3xl font-bold pb-4'>{product.title}</h1>
            <p className='font-bold'>{product.regularPrice}</p>
            <div className='pt-2'>
              <p>Quantité</p>
              <div className='flex justify-around rounded-md w-32 border border-1 border-black px-3 py-2 mt-1'>
                <button onClick={() => { if (count > 1) decrement(); }}>-</button>
                <p>{count}</p>
                <button onClick={increment}>+</button>
              </div>
            </div>
            {id_product === 'fda7' ? (
              <div>
                <Button children='Sold out' color='secondary' />
                <Link to='/payment'><Button children='Buy it now' color='primary'/></Link>
              </div>
            ) : (
              <div>
                <Button onClick={handleAddToCart} children='Add to cart' color='secondary' />
                <Link to='/payment'><Button children='Buy it now' color='primary'/></Link>
              </div>
            )}
            <div>
              <ul>
                {product.properties.map((property, index) => {
                  const className = index === 0 ? 'italic my-3' : 'list-disc mt-3 ml-3';
                  return (
                    <li key={index} className={className}>
                      {property}
                    </li>
                  );
                })}
              </ul>
            </div>                  
          </div>
        </div>
      )}      
      {isPopupVisible && product && <PopupCart product={product} onClose={() => setIsPopupVisible(false)} cartCount={cartCount}/>}        
    </div>
  );
}

export default ArticleItem;

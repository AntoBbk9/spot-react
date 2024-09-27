import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Button from './button';

interface Product {
  id: string;
  title: string;
  regularPrice: string;
  images: string[];
  properties: string[];
}

function ArticleItem() {
  const { id_product } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const [showCard, setShowCard] = useState<boolean>(false);

  async function fetchProduct() {
    try {
      setLoading(true);
      const response = await axios.get(`https://spot-react.onrender.com/products/${id_product}`);
      setProduct(response.data); 
      setLoading(false);
    } catch (err) {
      setError("Erreur lors de la récupération du produit.");
      console.error(err);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id_product]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='pt-6'>
      {product && (
        <div className='flex gap-4'>
            <div>
            <ul className=''>
                        {product.images.map((image, index) => {
                            let className = 'text-sm';

                            if (index === 0) {
                               className='w-96';
                            }
                                else {
                            className='w-40 pt-6';
                            }

                            return (
                            <li key={index} className={className}>
                                <img src={image} alt={product.title} />
                            </li>
                            );
                        })}
                    </ul>   
            </div>
            <div className='w-60'>
                <h1 className='text-3xl font-bold pb-4'>{product.title}</h1>
                <p className='font-bold'>{product.regularPrice}</p>
                <div className='pt-2'>
                    <p>Quantity</p>
                    <div className='flex justify-around rounded-md w-32 border border-1 border-black px-3 py-2 mt-1'>
                        <button onClick={() => {if (count > 0) {setCount(count - 1);}}}>-</button>
                        <p>{count}</p>
                        <button onClick={() => setCount(count + 1)}>+</button>
                    </div>
                </div>
                <Button children='Sold out' color='secondary'/>
                <Link to='/payment'><Button children='Buy it now' color='primary'/></Link>
                <div>
                    <ul className=''>
                        {product.properties.map((property, index) => {
                            let className = 'text-sm';

                            if (index === 0) {
                            className += ' italic my-3';
                            }
                                else {
                            className += ' list-disc mt-3 ml-3';
                            }

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
    </div>
  );
}

export default ArticleItem;
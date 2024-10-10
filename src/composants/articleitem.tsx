import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Button from './button';
import { FaArrowLeft } from 'react-icons/fa';
import PopupCart from './card';
import { Product } from './typeProduct';

interface CartItem {  
  product: Product;
  quantity: number;
}

function ArticleItem() {
  const { id_product } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(1);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);

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

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    const existingProductIndex = cartItems.findIndex((item: CartItem) => item.product.id === product?.id);

    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += count;
    } else {
      cartItems.push({ product, quantity: count });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    setCartCount(cartCount + count )
    setIsPopupVisible(true);
    setCount(1);
    
  };  

  return (
    <div className='pt-6'>

      <Link to={"/"}>
        <FaArrowLeft className='mb-2'/>
      </Link>
      {product && (
        <div className='flex gap-4'>
          <div>
            <ul>
              {product.images.map((image, index) => {
                const className = index === 0 ? 'w-96' : 'w-40 pt-6';
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
              <p>Quantité</p>
              <div className='flex justify-around rounded-md w-32 border border-1 border-black px-3 py-2 mt-1'>
                <button onClick={() => { if (count > 0) setCount(count - 1); }}>-</button>
                <p>{count}</p>
                <button onClick={() => setCount(count + 1)}>+</button>
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

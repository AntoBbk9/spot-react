import { useForm } from "react-hook-form";
import Input from "../composants/payement/input";
import Button from "../composants/button";
import { BsHandbag } from "react-icons/bs";
import axios from 'axios';
import { useEffect, useState } from "react";
import { CartItem } from "../composants/cartItemtype";
import { FiSearch } from "react-icons/fi";

interface Payment{
  mailOuTel: string,
  firstName: string,
  lastName: string,
  adress: string,
  apartment: string,
  city: string, 
  zipCode: string,
  cardNumber: string,
  securityCode: string,
  expirationDate: string,
  nameOnCard: string,
  cartItems: CartItem[]
}

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Payment>();
  
async function formSubmit(data: Payment) {
  try {
    const paymentData = {
      ...data,
      cartItems
    };

    const response = await axios.post("https://spot-react.onrender.com/payments", paymentData);
    console.log(response.data);
    reset(); 
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire :", error);
  }
}

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
  }, []);


  const extractPrice = (priceString : string) => {
    const priceMatch = priceString.match(/[\d.,]+/);
    return priceMatch ? parseFloat(priceMatch[0].replace(',', '.')) : 0;
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + extractPrice(item.product.regularPrice) * item.quantity,
    0
  );


  return (
    <div className='m-auto pt-10'>  
      <div className='flex justify-between pb-10 px-32'>
      <img src="/logo40.png" alt="photo du logo" className='w-24 h-10'/>
      <div className='flex gap-2'>
        <BsHandbag />
      </div>
      </div>
        <div className="flex flex-col lg:flex-row justify-between w-full border-t border-gray-200 2xl:w-[90rem] gap-6 m-auto bg-white">
          <div className="flex mb-6 lg:mb-0 ml-32">
            <form action="" onSubmit={handleSubmit(formSubmit)} className="mt-5">
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <Input
                id="mailOuTel"
                type="text"
                placeholder="Email or mobile phone number"
                register={register}
                validation={{
                  required: "Ce champ est requis",
                  validate: (value: string) => {
                    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
                    const isPhone = /^\+243\d{9}$/.test(value);
                    if (!isEmail && !isPhone) {
                      return "Numéro ou email invalide";
                    }
                  }
                }}
                errors={errors}
                border="border"
              />

              <label className="flex items-center mb-4">
                <input type="checkbox" className="mr-2" />
                Email me with news and offers
              </label>

              <h2 className="text-2xl font-bold mb-4 ">Delivery</h2>
              <select className="border p-2 w-full mb-4">
                <option>states</option>
                <option>United States</option>
              </select>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name (optional)"
                  register={register}
                  validation={{
                    required: "Ce champ est requis",
                    minLength: {
                      value: 3,
                      message: "Le prénom doit contenir au moins 3 caractères",
                    },
                    maxLength: {
                      value: 50,
                      message: "Le prénom doit contenir au maximum 50 caractères",
                    }
                  }}
                  errors={errors}
                  border='border'
                />
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  register={register}
                  validation={{
                    required: "Ce champ est requis",
                    minLength: {
                      value: 3,
                      message: "Le nom doit contenir au moins 3 caractères",
                    },
                    maxLength: {
                      value: 50,
                      message: "Le nom doit contenir au maximum 50 caractères",
                    }
                  }}
                  errors={errors}
                  border="border"
                />
              </div>
              <div className="flex justify-between items-center h-10 mb-3 border rounded p-2">
                <Input
                  id="adress"
                  type="text"
                  placeholder="Adress"
                  register={register}
                  validation={{
                    required: "Ce champ est requis",
                    minLength: {
                      value: 3,
                      message: "L'adresse doit contenir au moins 3 caractères",
                    },
                    maxLength: {
                      value: 50,
                      message: "L'adresse doit contenir au maximum 50 caractères",
                    }
                  }}
                  errors={errors}
                  border="none"
                  />
                  <FiSearch />
                </div>

              <Input
                  id="apartment"
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  register={register}
                  validation={{
                    required: "Ce champ est requis",
                    minLength: {
                      value: 3,
                      message: "L'appartement doit contenir au moins 3 caractères",
                    },
                    maxLength: {
                      value: 50,
                      message: "L'appartement doit contenir au maximum 50 caractères",
                    }
                  }}
                  errors={errors}
                  border="border"
                />
              
              <div className="grid grid-cols-3 gap-2">
                <Input
                  id="city"
                  type="text"
                  placeholder="City"
                  register={register}
                  validation={{
                    required: "Ce champ est requis",
                    minLength: {
                      value: 2,
                      message: "La ville doit contenir au moins 2 caractères",
                    }
                  }}
                  errors={errors}
                  border="border"
                />

                <select className="border p-2 h-10 rounded">
                  <option>States</option>
                  <option>United States</option>
                </select>

                <Input
                  id="zipCode"
                  type="text"
                  placeholder="ZIP code"
                  register={register}
                  validation={{
                    required: "Ce champ est requis",
                    pattern: {
                      value: /^[0-9]{5}$/,
                      message: "Le code postal doit contenir 5 chiffres",
                    }
                  }}
                  errors={errors}
                  border="border"
                />
              </div>

              <label className="flex items-center mb-4">
                <input type="checkbox" className="mr-2" />
                Save this information for next time
              </label>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Shipping method</h2>
                <div className="bg-graycolor p-4 rounded text-[0.75rem]">
                  Enter your shipping address to view available shipping methods.
                </div>
              </div>

              <h2 className="text-2xl font-bold my-4">Payment</h2>
              <p className="text-sm text-gray-500 mb-2">All transactions are secure and encrypted.</p>
              <div className="flex justify-between items-center rounded-t border border-blue-400 bg-blue-50 p-4">
                  <h3 className="text-lg font-semibold">Credit card</h3>
                  <div className="_5uqybw2 _5uqybw1 _1fragem28 _1fragemkp _1fragem3c _1fragem55 _1fragemm8 _1fragemmc _1fragem78"><img alt="BOGUS" src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/bogus.CIsYlO1z.svg" role="img" width="38" height="24" className="_1tgdqw61 _1tgdqw60 _1fragemsf _1fragemsa _1fragemsp _1fragemoc _1tgdqw66"/></div>
                </div>
              <div className="border p-4 mb-4 bg-graycolor border-gray-300 rounded-b">
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="Card number"
                  register={register}
                  validation={{
                    required: "Le numéro de carte est requis",
                    pattern: {
                      value: /^[0-9]{16}$/,
                      message: "Le numéro de carte doit contenir 16 chiffres",
                    }
                  }}
                  errors={errors}
                  border="none"
                />

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Input
                    id="expirationDate"
                    type="text"
                    placeholder="Expiration date (MM / YY)"
                    register={register}
                    validation={{
                      required: "La date d'expiration est requise",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                        message: "La date doit être au format MM/YY",
                      }
                    }}
                    errors={errors}
                    border="border"
                  />
                  <Input
                    id="securityCode"
                    type="text"
                    placeholder="Security code"
                    register={register}
                    validation={{
                      required: "Le code de sécurité est requis",
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: "Le code de sécurité doit contenir 3 ou 4 chiffres",
                      }
                    }}
                    errors={errors}
                    border="none"
                  />
                </div>

                <Input
                  id="nameOnCard"
                  type="text"
                  placeholder="Name on card"
                  register={register}
                  validation={{
                    required: "Le nom sur la carte est requis",
                    minLength: {
                      value: 3,
                      message: "Le nom doit contenir au moins 3 caractères",
                    }
                  }}
                  errors={errors}
                  border="border"
                />

                <label className="flex items-center mb-4">
                  <input type="checkbox" className="mr-2" />
                  Use shipping address as billing address
                </label>
              </div>
              <div className="pb-10 border-b">
                <Button children="Pay now" color="tertiary"/>
              </div>

              <hr />
              <p className="py-4 text-sm">All rights reserved theme-spotlight-demo</p>
            </form>
          </div>
          <div className="bg-graycolor sticky top-20 w-1/2 border-l border-gray-200">
            <div className="p-4 mr-32">
              <h2 className="text-xl font-bold mb-4">Your Cart</h2>
              {cartItems.map((item, index) => (
                <div key={index} className="flex flex-col mb-4">
                  <div className="flex justify-between mb-2 items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-16 h-16 rounded object-cover"
                          />
                      <span className="text-sm">{item.product.title}</span>
                    </div>
                    <span className="text-sm">{item.product.regularPrice}</span>
                  </div>
                </div>
              ))}
                  <div className="pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Subtotal</span>
                      <span className="text-sm">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Shipping</span>
                      <span className="text-sm">Enter shipping address</span>
                    </div>
                  </div>
               <div className="flex justify-between font-bold pt-3">
                    <span>Total</span>
                    <span>CAD ${subtotal.toFixed(2)}</span>
                  </div>
            </div>
          </div>
        </div>
  </div>
  );
};

export default CheckoutPage;

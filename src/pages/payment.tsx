import { useForm } from "react-hook-form";

interface Payment{
    mailOuTel: string,
    firstName: string,
    lastName: string,
    city: string, 
    zipCode: string,
    cardNumber: string,
    securityCode: string,
    expirationDate: string,
    nameOnCard: string

}
const CheckoutPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Payment>();
    
    const onSubmit = (data: Payment) => {
        console.log(data);
      };
  return (
    <div className="flex flex-col lg:flex-row justify-between w-[90rem] gap-6 m-auto p-6 bg-white shadow-md">
      <div className="flex-1 mb-6 lg:mb-0 w-1/2">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <input
          id="mailOuTel"
          type="text"
          placeholder="Email or mobile phone number"
          {...register("mailOuTel", { pattern : {
            value: /^(?:\+243[0-9]{9}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            message: "Adresse email invalide"
          }})}
          className="border p-2 w-full mb-4"
        />
        <p>{errors.mailOuTel && <p className="text-red-500">{errors.mailOuTel.message}</p>}</p>

        <label className="flex items-center mb-4">
          <input type="checkbox" className="mr-2" />
          Email me with news and offers
        </label>

        <h2 className="text-2xl font-bold mb-4">Delivery</h2>
        <select className="border p-2 w-full mb-4">
          <option>Country/Region</option>
          <option>United States</option>
        </select>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="First name (optional)"
            className="border p-2 w-1/2 mr-2"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border p-2 w-1/2"

          />
        </div>
        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Apartment, suite, etc. (optional)"
          className="border p-2 w-full mb-4"
        />
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="City"
            className="border p-2 w-1/2 mr-2"
          />
          <input
            type="text"
            placeholder="State"
            className="border p-2 w-1/2 mr-2"
          />
          <input
            type="text"
            placeholder="ZIP code"
            className="border p-2 w-1/4"
          />
        </div>
        <label className="flex items-center mb-4">
          <input type="checkbox" className="mr-2" />
          Save this information for next time
        </label>

        <h2 className="text-2xl font-bold mb-4">Shipping method</h2>
        <input
          type="text"
          placeholder="Enter your shipping address to view available shipping methods."
          className="border p-2 w-full mb-4"
        />

        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <p className="mb-4">All transactions are secure and encrypted.</p>
        <div className="border p-4 mb-4">
          <h3 className="text-lg font-semibold">Credit card</h3>
          <input
            type="text"
            placeholder="Card number"
            className="border p-2 w-full mb-2"
          />
          <div className="flex mb-2">
            <input
              type="text"
              placeholder="Expiration date (MM / YY)"
              className="border p-2 w-1/2 mr-2"
            />
            <input
              type="text"
              placeholder="Security code"
              className="border p-2 w-1/2"
            />
          </div>
          <input
            type="text"
            placeholder="Name on card"
            className="border p-2 w-full mb-2"
          />
          <label className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            Use shipping address as billing address
          </label>
        </div>
        <button className="bg-blue-600 text-white p-2 rounded w-full">
          Pay now
        </button>
        </form>
      </div>

      <div className="bg-gray-100 p-4 w-1/2">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <div className="flex justify-between mb-2">
          <span>Cap Wool</span>
          <span>$48.00</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>$48.00</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>Enter shipping address</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>CAD $48.00</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

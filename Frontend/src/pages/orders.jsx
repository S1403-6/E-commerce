import React, { useEffect } from "react";
import { useAppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { cart, setCart, user, loading: authLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [authLoading, user, navigate]);

  if (authLoading) {
    return <div className="p-8 text-center">Checking authentication...</div>;
  }

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  const handleDelete = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const totalBill = cart.reduce((acc, item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 1;
    return acc + price * quantity;
  }, 0);

  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto pb-20">
      <h2 className="text-3xl font-bold mb-8 border-b pb-4">Your Orders</h2>

      {cart.length === 0 ? (
        <div className="bg-gray-50 p-10 rounded-xl text-center">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <button 
            onClick={() => navigate('/menu')}
            className="mt-4 text-blue-600 font-bold hover:underline"
          >
            Browse the Menu
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between border p-6 rounded-xl shadow-sm bg-white"
              >
                <div className="flex flex-col">
                  <p className="text-xl font-bold text-gray-900">{item.name}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <select
                      className="border rounded-lg p-1.5 text-sm bg-gray-50 focus:outline-blue-600"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value))
                      }
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          Qty: {i + 1}
                        </option>
                      ))}
                    </select>
                    <span className="text-gray-500">× ₹{item.price}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <p className="text-xl font-bold text-blue-600">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 font-semibold hover:text-red-700 p-2"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t pt-6 flex flex-col items-end">
            <div className="text-gray-600 text-lg mb-1">Total Bill</div>
            <div className="text-3xl font-black text-gray-900">₹{totalBill}</div>
            
            <div className="mt-8 flex gap-4">
               <button
                onClick={() => navigate("/menu")}
                className="px-6 py-3 rounded-xl font-bold border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Add More
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
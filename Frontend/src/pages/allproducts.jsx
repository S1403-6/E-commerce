import React, { useEffect } from "react";
import { useAppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const {
    user,
    loading: authLoading,
    products,
    cart,
    addToCartWithQuantity,
  } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [authLoading, user, navigate]);

  const handleAddToCart = (product) => {
    const exists = cart.some((item) => item.name === product.name);
    if (exists) {
      alert(`${product.name} is already added to the cart.`);
      return;
    }
    addToCartWithQuantity(product, 1);
  };

  return (
    <div className="pt-32 px-6 pb-20 max-w-3xl mx-auto">
      
      {/* Container for vertical stacking */}
      <div className="flex flex-col gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex justify-between items-center hover:shadow-md transition-shadow"
          >
            <div>
              <p className="text-xl font-bold text-gray-900">{product.name}</p>
              <p className="text-gray-600 font-medium mt-1">Price: ₹{product.price}</p>
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
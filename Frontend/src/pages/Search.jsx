import React from "react";
import { useAppContext } from "../context/Appcontext";

const Search = () => {
  const { products, searchTerm, cart, addToCartWithQuantity } = useAppContext();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">Search Results</h2>
        <p className="text-gray-500 mt-2">
          Showing results for: <span className="font-semibold text-blue-600">"{searchTerm}"</span>
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.length > 0 ? (
          filtered.map((product, index) => (
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
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <p className="text-xl text-gray-500 font-medium">No products match your search.</p>
            <p className="text-gray-400 mt-2 text-sm">Try searching for something else like "Pizza" or "Dosa".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
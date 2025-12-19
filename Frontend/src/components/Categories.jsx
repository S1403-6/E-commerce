import React from "react";
import { categories } from "../assets/assets";

const Categories = () => {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
        Explore Cuisines
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div 
            key={category.path}
            style={{ backgroundColor: category.bgColor }}
            className="group relative h-64 rounded-3xl p-8 flex flex-col justify-end overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-black/5"
          >

            <div className="absolute top-6 right-6 opacity-20 group-hover:scale-110 transition-transform">
               <div className="w-12 h-12 bg-black rounded-full" /> 
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800">
              {category.text}
            </h3>
            <p className="text-sm font-medium text-gray-600 mt-2 group-hover:translate-x-1 transition-transform">
              Browse Menu →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
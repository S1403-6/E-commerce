import React from 'react';
import Categories from '../components/Categories';
import { useAppContext } from '../context/Appcontext';

const Home = () => {
  const { user, setShowUserLogin } = useAppContext();

  return (
    <main className="pt-20 px-6 max-w-7xl mx-auto min-h-screen pb-20">
      <div className="mb-16 text-left">
        {/* <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">
          Premium Delivery
        </span> */}
        <h1 className="text-6xl md:text-7xl font-black text-gray-900 mt-4 leading-tight">
          Treat your tastebuds <br /> to <span className="text-blue-500">Restauranto.</span>
        </h1>
        {/* <p className="text-gray-500 mt-6 text-xl max-w-2xl">
          Discover the best dishes from top-rated local restaurants, delivered fresh to your door.
        </p> */}
      </div>
      
      <Categories />

      {!user && (
        <div className="mt-20 flex justify-center">
          <button 
            onClick={() => setShowUserLogin(true)}
            className="bg-blue-500 text-white text-xl font-bold px-12 py-5 rounded-2xl shadow-xl hover:bg-orange-600 hover:scale-105 transition-all"
          >
            Sign in to Start Ordering
          </button>
        </div>
      )}
    </main>
  );
};

export default Home;
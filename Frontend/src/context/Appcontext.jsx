import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [seller, isseller] = useState(false);
  const [ShowUserLogin, setShowUserLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart((prev) => [...prev, { ...product, quantity }]);
  };

  const addToCartWithQuantity = (product, quantity) => {
    setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    alert(`You have ordered ${quantity} of ${product.name}`);
  };

  const products = [
    { name: "Aloo Parantha",price: 50 },
    { name: "Gobi Parantha", price: 60 },
    { name: "Mixed-Veg Parantha", price: 60 },
    { name: "Veg Biryani", price: 300 },
    { name: "Mixed-Veg Curry", price: 350 },
    { name: "Roti(X2)", price: 60 },
    { name: "Butter Naan(X2)", price: 90 },
    { name: "Fried Rice", price: 250 },
    { name: "Burnt Garlic Fried Rice", price: 280 },
    { name: "Hakka Noodles", price: 300 },
    { name: "Burnt Garlic Noodles", price: 350 },
    { name: "Margerita Pizza", price: 180 },
    { name: "Farm Fresh Pizza", price: 250 },
    { name: "Alfredo Pasta", price: 200 },
    { name: "Penne Arabhiatta", price: 200 },
    { name: "Pesto Pasta", price: 250 },
    { name: "Aglio Olio", price: 250 },
 
  ];

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Skipping fetch temporarily...");
      setUser(null);
      setLoading(false);
    };
    fetchUser();
  }, []);
  
  
  
  const value = {
    navigate,
    user,
    setUser,
    seller,
    isseller,
    ShowUserLogin,
    setShowUserLogin,
    products,
    cart,
    setCart,
    addToCart,
    searchTerm,
    setSearchTerm,
    addToCartWithQuantity,
    loading, 
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

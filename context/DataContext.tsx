// datacontext.tsx

import React, { createContext, ReactNode, useState } from "react";
import { Products } from "../types/types";

interface DataContextType {
  products: Products[];
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  cart: Products[];
  addToCart: (product: Products) => void;
  clearCart: () => void;
}

export const DataContext = createContext<DataContextType>({
  products: [],
  setProducts: () => {},
  cart: [],
  addToCart: () => {},
  clearCart: () => {},
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [cart, setCart] = useState<Products[]>([]);

  const addToCart = (product: Products) => {
    setCart((prevCart) => {
      // Avoid duplicates or add multiple times (optional)
      if (prevCart.find((p) => p.id === product.id)) return prevCart;
      return [...prevCart, product];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <DataContext.Provider value={{ products, setProducts, cart, addToCart, clearCart }}>
      {children}
    </DataContext.Provider>
  );
};
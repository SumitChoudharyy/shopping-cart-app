"use client";

import { data } from "@/data/data";
import { createContext, useContext, useEffect, useState } from "react";


//App Context Created
export const AppContext = createContext();

//Provider for App Context is created here
export function AppContextProvider({ children }) {
  const [ProductList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    setProductList(data);
  }, []);


  /* Add Function add the item to are cart and if it already exist 
  then increases its count */
  const add = (id) => {
    const itemInCart = cart.find((cartItem) => cartItem.item.id === id);
    if (itemInCart) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.item.id === id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      const product = ProductList.find((product) => product.id === id);
      setCart((prevCart) => [...prevCart, { item: product, quantity: 1 }]);
    }
  };


  /* Remove Function remove the item to are cart and if quantity of the cart is more then
  1 then reduce the quantity*/
  const remove = (id) => {
    const itemInCart = cart.find((cartItem) => cartItem.item.id === id);

    if (itemInCart && itemInCart.quantity > 1) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.item.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCart((prevCart) =>
        prevCart.filter((cartItem) => cartItem.item.id !== id)
      );
    }
  };


  // removeComplete function completly remove the item from the cart
  const removeComplete = (id) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.item.id !== id));
  }

  //Values
  const value = {
    ProductList,
    cart,
    add,
    remove,
    removeComplete,
    setCart
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}


//Custom hook to reduce import statement
export function useCart() {
  return useContext(AppContext);
}
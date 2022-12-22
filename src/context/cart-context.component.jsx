import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCardOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCardOpen] = useState(false);

  const value = { isCartOpen, setIsCardOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

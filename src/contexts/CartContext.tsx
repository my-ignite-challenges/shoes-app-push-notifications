import { createContext, useState, ReactNode, useEffect } from "react";

import {
  StorageCartProps,
  saveProductToStorage,
  removeProductFromStorage,
  getProductsFromStorage,
} from "../storage/storageCart";

export type CartContextDataProps = {
  addProductToCart: (newProduct: StorageCartProps) => Promise<void>;
  removeProductFromCart: (productId: string) => Promise<void>;
  cart: StorageCartProps[];
};

type CartContextProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextDataProps>(
  {} as CartContextDataProps
);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<StorageCartProps[]>([]);

  async function addProductToCart(newProduct: StorageCartProps) {
    try {
      const storageResponse = await saveProductToStorage(newProduct);
      setCart(storageResponse);
    } catch (error) {
      throw error;
    }
  }

  async function removeProductFromCart(productId: string) {
    try {
      const response = await removeProductFromStorage(productId);
      setCart(response);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getProductsFromStorage()
      .then((products) => setCart(products))
      .catch((error) => console.log(error));
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

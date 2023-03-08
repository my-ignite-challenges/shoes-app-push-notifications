import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageSourcePropType } from "react-native";

const CART_STORAGE = "@IGNITESHOES_CART";

export type StorageCartProps = {
  id: string;
  name: string;
  size: number;
  quantity: number;
  image: ImageSourcePropType;
};

export async function getProductsFromStorage() {
  try {
    const storage = await AsyncStorage.getItem(CART_STORAGE);
    const products: StorageCartProps[] = storage ? JSON.parse(storage) : [];

    return products;
  } catch (error) {
    throw error;
  }
}

export async function saveProductToStorage(newProduct: StorageCartProps) {
  try {
    let products = await getProductsFromStorage();

    const productExists = products.filter(
      (product) => product.id === newProduct.id
    );

    if (productExists.length > 0) {
      products = products.map((product) => {
        if (product.id === newProduct.id) {
          product.quantity =
            Number(product.quantity) + Number(newProduct.quantity);
        }

        return product;
      });
    } else {
      products.push(newProduct);
    }

    const updatedProductList = JSON.stringify(products);
    await AsyncStorage.setItem(CART_STORAGE, updatedProductList);

    return products;
  } catch (error) {
    throw error;
  }
}

export async function removeProductFromStorage(productId: string) {
  try {
    const products = await getProductsFromStorage();

    const filteredProducts = products.filter(
      (product) => product.id !== productId
    );
    await AsyncStorage.setItem(CART_STORAGE, JSON.stringify(filteredProducts));

    return filteredProducts;
  } catch (error) {
    throw error;
  }
}

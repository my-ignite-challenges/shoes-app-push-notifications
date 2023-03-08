import { useEffect, useState } from "react";
import { VStack } from "native-base";

import { PRODUCTS } from "../data/products";

import { Brands } from "../components/Brands";
import { Products } from "../components/Products";
import { HomeHeader } from "../components/HomeHeader";
import { ProductCardProps } from "../components/ProductCard";

export function Home() {
  const [selectedBrand, setSelectedBrand] = useState("Nike");
  const [products, setProducts] = useState<ProductCardProps[]>([]);

  useEffect(() => {
    const filtered = PRODUCTS.filter(
      (product) => product.brand === selectedBrand
    ) as ProductCardProps[];
    setProducts(filtered);
  }, [selectedBrand]);

  return (
    <VStack flex={1}>
      <HomeHeader />
      <Brands onSelect={setSelectedBrand} selected={selectedBrand} />
      <Products brand={selectedBrand} data={products} />
    </VStack>
  );
}

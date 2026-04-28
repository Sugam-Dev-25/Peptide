import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";

const OnSale = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "/api/wp-json/wc/v3/products?on_sale=true&per_page=8&consumer_key=ck_46b3ea052203228c821278503c5e8bd205bdb162&consumer_secret=cs_17182798cdfea4b3a33c399ab522b3ad0c48770e"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return <ProductGrid products={products} title="On Sale" />;
};

export default OnSale;
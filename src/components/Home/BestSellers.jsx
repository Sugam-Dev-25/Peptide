import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "api/wp-json/wc/v3/products?orderby=popularity&per_page=8&consumer_key=ck_46b3ea052203228c821278503c5e8bd205bdb162&consumer_secret=cs_17182798cdfea4b3a33c399ab522b3ad0c48770e"
    )
      .then((res) => res.json())
      .then((data) => {
        // 🔥 only sold products
        const filtered = data.filter((p) => p.total_sales > 0);
        setProducts(filtered);
      });
  }, []);

  return <ProductGrid products={products} title="Best Sellers" />;
};

export default BestSellers;
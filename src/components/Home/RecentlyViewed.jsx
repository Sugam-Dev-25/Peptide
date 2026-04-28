import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setProducts(viewed);
  }, []);

  if (products.length === 0) return null;

  return <ProductGrid products={products} title="Recently Viewed" />;
};

export default RecentlyViewed;
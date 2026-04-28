import React, { useEffect, useState } from "react";
import ProductGrid from "../Home/ProductGrid";

const RecentViewed = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setProducts(viewed);
  }, []);

  return (
    <div>
      <ProductGrid products={products} title="Recently Viewed" />
    </div>
  );
};

export default RecentViewed;
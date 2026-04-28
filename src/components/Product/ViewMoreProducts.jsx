import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductGrid from "../Home/ProductGrid";
import SidebarFilters from "./SidebarFilters";

const ViewMoreProducts = () => {
  const { type } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // FILTER STATES
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");

  const getApiUrl = () => {
    let base = `/api/wp-json/wc/v3/products?per_page=20`;

    switch (type) {
      case "best-sellers":
        base += "&orderby=popularity";
        break;
      case "on-sale":
        base += "&on_sale=true";
        break;
      case "featured":
        base += "&featured=true";
        break;
      case "top-rated":
        base += "&orderby=rating&order=desc";
        break;
      case "new-arrivals":
        base += "&orderby=date&order=desc";
        break;
    }

    

    // CATEGORY
    if (selectedCategory) base += `&category=${selectedCategory}`;

    // BRAND (Woo attribute)
    if (selectedBrand) {
      base += `&attribute=pa_brand&attribute_term=${selectedBrand}`;
    }

    // PRICE
    if (minPrice) base += `&min_price=${minPrice}`;
    if (maxPrice) base += `&max_price=${maxPrice}`;

    return base;
  };

  useEffect(() => {
    setLoading(true);

    fetch(
      `${getApiUrl()}&consumer_key=ck_46b3ea052203228c821278503c5e8bd205bdb162&consumer_secret=cs_17182798cdfea4b3a33c399ab522b3ad0c48770e`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [type, selectedCategory, selectedBrand, minPrice, maxPrice, rating]);

const filteredProducts = products
  .filter((p) => {
    const ratingVal = parseFloat(p.average_rating || 0);

    // ✅ BEST SELLER (unchanged)
    if (type === "best-sellers") {
      return (p.total_sales || 0) > 0;
    }

    // ✅ TOP RATED → ONLY rated products
    if (type === "top-rated") {
      // ❌ remove no rating
      if (!p.average_rating || ratingVal === 0) {
        return false;
      }

      // ⭐ if user selects rating
      if (rating) {
        return ratingVal >= rating;
      }

      return true;
    }

    // ⭐ other pages rating filter
    if (rating) {
      return ratingVal >= rating;
    }

    return true;
  })
  .sort((a, b) => {
    if (type === "best-sellers") {
      return (b.total_sales || 0) - (a.total_sales || 0);
    }

    if (type === "top-rated") {
      return (
        parseFloat(b.average_rating || 0) -
        parseFloat(a.average_rating || 0)
      );
    }

    return 0;
  });
  return (
    <div className="flex gap-6 px-6 py-6">

      {/* SIDEBAR */}
      <div className="w-[250px] hidden md:block">
        <SidebarFilters
          setSelectedCategory={setSelectedCategory}
          setSelectedBrand={setSelectedBrand}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setRating={setRating}
        />
      </div>

      {/* PRODUCTS */}
      <div className="flex-1">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ProductGrid
            products={filteredProducts}
            title={type.replace("-", " ")}
            showViewMore={false}
          />
        )}
      </div>

    </div>
  );
};

export default ViewMoreProducts;
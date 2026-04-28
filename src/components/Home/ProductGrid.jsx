import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InquiryModal from "../Product/InquiryModal";
import { useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../store/cartSlice";
import { useSelector } from "react-redux";

const ProductGrid = ({ products, title, showViewMore = true }) => {
  const navigate = useNavigate();
  const [showInquiry, setShowInquiry] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { nonce } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleAddToCart = async (item) => {
    await dispatch(addToCart({ productId: item.id, nonce }));
    dispatch(fetchCart());
    console.log("Adding product:", item.id, "Nonce:", nonce);
    console.log("Nonce:", nonce); 
  };

  const handleViewMore = () => {
    switch (title) {
      case "New Arrivals":
        navigate("/products/new-arrivals");
        break;
      case "Featured Products":
        navigate("/products/featured");
        break;
      case "Best Sellers":
        navigate("/products/best-sellers");
        break;
      case "On Sale":
        navigate("/products/on-sale");
        break;
      case "Top Rated":
        navigate("/products/top-rated");
        break;
      case "Recently Viewed":
        navigate("/products/recent-viewed");
        break;
      default:
        break;
    }
  };

  const getPrice = (item) => {
    if (item.price) return item.price;
    if (item.prices?.price) return item.prices.price / 100;
    return 0;
  };

  const getShortDescription = (item) => {
    const text = (item.short_description || item.description || "")
      .replace(/<[^>]+>/g, "")
      .trim();

    const words = text.split(" ");
    return words.slice(0, 4).join(" ") + (words.length > 4 ? "..." : "");
  };

  const getDiscountPercent = (item) => {
    const sale = parseFloat(item.sale_price);
    const reg = parseFloat(item.regular_price);

    const storeSale = item.prices?.price
      ? parseInt(item.prices.price) / 100
      : null;

    const storeReg = item.prices?.regular_price
      ? parseInt(item.prices.regular_price) / 100
      : null;

    const finalSale = sale || storeSale;
    const finalReg = reg || storeReg;

    if (!finalSale || !finalReg || finalSale >= finalReg) return null;

    return Math.round(((finalReg - finalSale) / finalReg) * 100);
  };

  const handleViewProduct = (product) => {
    let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    viewed = viewed.filter((item) => item.id !== product.id);
    viewed.unshift(product);
    viewed = viewed.slice(0, 6);

    localStorage.setItem("recentlyViewed", JSON.stringify(viewed));

    // 🔥 IMPORTANT LINE (redirect)
    navigate(`/product/${product.id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const rate = parseFloat(rating);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className="text-orange-400 text-sm">
          {i <= rate ? "★" : "☆"}
        </span>,
      );
    }

    return stars;
  };

  const isInStock = (item) => {
    if (item.stock_quantity !== undefined) {
      return item.stock_quantity > 0;
    }

    return (
      item.is_in_stock === true ||
      item.stock_status === "instock" ||
      item.prices?.stock_status === "instock"
    );
  };

  return (
    <div className="mb-10 px-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold capitalize text-[#071A2D]">
          {title}
        </h2>

        {showViewMore && (
          <button
            onClick={handleViewMore}
            className="bg-[#071A2D] text-[#FDC700] px-5 py-2 transition"
          >
            View More
          </button>
        )}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5">
        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => handleViewProduct(item)}
            className="p-3 rounded-lg hover:shadow-lg transition cursor-pointer"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={item.images?.[0]?.src}
                alt={item.name}
                className="w-full rounded-full shadow-md"
              />

              {/* SALE BADGE */}
              {getDiscountPercent(item) && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-bold">
                  -{getDiscountPercent(item)}%
                </span>
              )}
            </div>

            {/* TITLE */}
            <h4 className="mt-2 font-medium text-sm line-clamp-2">
              {item.name}
            </h4>

            {/* PRICE + RATING */}
            <div className="flex items-center justify-between mt-1 mb-1">
              <p className="font-bold text-sm">₹{getPrice(item)}</p>

              {item.average_rating > 0 && (
                <div className="flex items-center">
                  {renderStars(item.average_rating)}
                  <span className="text-xs ml-1 text-gray-500">
                    ({item.rating_count || 0})
                  </span>
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="text-xs text-gray-500 mb-2">
              {getShortDescription(item)}
            </p>

            {/* BUTTON */}
            {isInStock(item) ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
                className="w-full bg-[#071A2D] text-[#FDC700] text-sm py-2"
              >
                Add to Cart
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(item); // 🔥 product set
                  setShowInquiry(true); // 🔥 modal open
                }}
                className="w-full bg-[#FDC700] text-[#071A2D] text-white text-sm py-2 cursor-pointer"
              >
                Send Inquiry
              </button>
            )}
          </div>
        ))}
      </div>

      {showInquiry && (
        <InquiryModal
          product={selectedProduct}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </div>
  );
};

export default ProductGrid;

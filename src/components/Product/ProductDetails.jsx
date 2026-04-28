import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import InquiryModal from "./InquiryModal";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null); // store API
  const [fullData, setFullData] = useState(null); // v3 API
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    // ✅ STORE API (lightweight data)
    fetch(`/api/wp-json/wc/store/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));

    // ✅ V3 API (full data: stock, rating, brand, meta)
    fetch(
      `/api/wp-json/wc/v3/products/${id}?consumer_key=ck_46b3ea052203228c821278503c5e8bd205bdb162&consumer_secret=cs_17182798cdfea4b3a33c399ab522b3ad0c48770e`,
    )
      .then((res) => res.json())
      .then((data) => setFullData(data));
  }, [id]);

  if (!product || !fullData) return <p className="p-10">Loading...</p>;

  const price = product.prices?.price / 100;

  // ⭐ STAR RENDER
  const renderStars = (rating) => {
    const stars = [];
    const rate = Math.round(rating);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rate ? (
          <FaStar key={i} className="text-yellow-400 text-sm" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400 text-sm" />
        ),
      );
    }
    return stars;
  };

  // 🛒 ADD TO CART (dummy)
  const handleAddToCart = () => {
    alert(`${product.name} added to cart 🛒 (Qty: ${qty})`);
  };

  // 📦 PINCODE CHECK
  const checkPincode = () => {
    const locations =
      fullData.available_locations ||
      fullData.meta_data?.find((m) => m.key === "available_locations")?.value;

    if (!locations) return;

    const list = locations.split(",");

    setIsAvailable(list.includes(pincode.trim()));
  };

  return (
    <div className="px-10 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* LEFT IMAGE */}
        <div className="rounded-lg shadow-lg">
          <img
            src={product.images?.[0]?.src}
            alt={product.name}
            className="w-full h-[600px] object-cover"
          />
        </div>

        {/* RIGHT SIDE */}
        <div>
          {/* TITLE + STOCK */}
          <div className="mb-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-4xl font-bold text-[#071A2D]">
                {product.name}
              </h1>

              {fullData.stock_status === "instock" && (
                <span className="text-green-600 text-sm bg-green-100 px-2 py-1 rounded">
                  In Stock ({fullData.stock_quantity || 0})
                </span>
              )}
            </div>

            {/* ⭐ RATING */}
            <div className="flex items-center mt-1">
              {renderStars(parseFloat(fullData.average_rating || 0))}
              <span className="text-xs ml-2 text-gray-500">
                ({fullData.rating_count || 0} reviews)
              </span>
            </div>
          </div>

          {/* PRICE */}
          <p className="text-4xl font-bold mb-4 text-[#FDC700]">₹{price}</p>

          {/* DESCRIPTION (HTML SAFE) */}
          <div
            className="text-[#071A2D] mb-6 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />

          {/* QTY + CART */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            {/* QTY */}
            <div className="flex items-center border border-gray-300">
              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="px-3 py-3"
              >
                -
              </button>
              <span className="px-4">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-3">
                +
              </button>
            </div>

            {fullData.stock_quantity > 0 ? (
              <button
                onClick={handleAddToCart}
                className="bg-[#071A2D] text-[#FDC700] px-6 py-3"
              >
                Add to cart
              </button>
            ) : (
              <button
                onClick={() => setShowInquiry(true)}
                className="bg-[#FDC700] text-[#071A2D] px-6 py-3 cursor-pointer"
              >
                Send Inquiry
              </button>
            )}

            {/* WISHLIST */}
            <button className="px-2 py-3">
              <FaHeart className="text-red-600 text-3xl" />
            </button>
          </div>

          {/* EXTRA INFO */}
          <div className="text-sm text-[#071A2D] space-y-1">
            {fullData.brands?.[0]?.name && (
              <p>
                <b>Brand:</b>{" "}
                <span className="text-[#FDC700] font-semibold">
                  {fullData.brands[0].name}
                </span>
              </p>
            )}

            <p>
              <b>Category:</b>{" "}
              <span className="text-[#FDC700] font-semibold">
                {product.categories?.map((c) => c.name).join(", ")}
              </span>
            </p>
          </div>

          {/* 📍 PINCODE CHECK */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-[#071A2D]">
              Check Delivery Availability
            </h4>

            <div className="flex gap-3 flex-wrap">
              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="border border-gray-300 px-4 py-3 w-[300px]"
              />

              <button
                onClick={checkPincode}
                className="bg-[#071A2D] text-[#FDC700] px-4 py-2"
              >
                Check
              </button>
            </div>

            {/* RESULT */}
            {isAvailable !== null && (
              <p
                className={`mt-3 font-semibold ${
                  isAvailable ? "text-green-600" : "text-red-500"
                }`}
              >
                {isAvailable
                  ? "Delivery Available at your location"
                  : "Sorry, not deliverable here"}
              </p>
            )}
          </div>
        </div>
      </div>
      {showInquiry && (
        <InquiryModal
          product={fullData}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;

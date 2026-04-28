import { useEffect, useState } from "react";

const SidebarFilters = ({
  setSelectedCategory,
  setSelectedBrand,
  setMinPrice,
  setMaxPrice,
  setRating,
}) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // CATEGORY
  useEffect(() => {
    fetch(
      `/api/wp-json/wc/v3/products/categories?per_page=50&consumer_key=ck_46b3ea052203228c821278503c5e8bd205bdb162&consumer_secret=cs_17182798cdfea4b3a33c399ab522b3ad0c48770e`
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (cat) => cat.slug !== "uncategorized"
        );
        setCategories(filtered);
      });
  }, []);

  // BRANDS
  useEffect(() => {
    fetch(
      `/api/wp-json/wc/v3/products/brands?per_page=50&consumer_key=ck_46b3ea052203228c821278503c5e8bd205bdb162&consumer_secret=cs_17182798cdfea4b3a33c399ab522b3ad0c48770e`
    )
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  return (
    <div className="space-y-8 text-[#071A2D]">

      {/* CATEGORY */}
      <div>
        <h3 className="font-bold text-xl mb-3 border-b border-[#FDC700] pb-2">
          Filter By Categories
        </h3>

        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center justify-between text-sm cursor-pointer hover:text-[#FDC700] transition"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  className="accent-[#FDC700]"
                  onChange={() => setSelectedCategory(cat.id)}
                />
                {cat.name}
              </div>

              <span className="text-xs text-[#FDC700]">
                {cat.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <h3 className="font-bold text-xl mb-3 border-b border-[#FDC700] pb-2">
          Filter By Price
        </h3>

        <div className="flex gap-2 mb-3">
          <input
            type="number"
            placeholder="Min"
            className="border  px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FDC700]"
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="border  px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FDC700]"
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <button className="w-full bg-[#FDC700] text-[#071A2D] py-2  text-sm transition shadow-lg ">
          Filter Now
        </button>
      </div>

      {/* BRAND */}
      <div>
        <h3 className="font-bold text-xl mb-3 border-b border-[#FDC700] pb-2">
          Filter By Brands
        </h3>

        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
          {brands.length === 0 && (
            <p className="text-xs text-gray-400">No brands found</p>
          )}

          {brands.map((brand) => (
            <label
              key={brand.id}
              className="flex items-center gap-2 text-sm cursor-pointer hover:text-green-600 transition"
            >
              <input
                type="radio"
                name="brand"
                className="accent-[#FDC700]"
                onChange={() => setSelectedBrand(brand.id)}
              />
              {brand.name}
            </label>
          ))}
        </div>
      </div>

      {/* RATING */}
      <div>
        <h3 className="font-bold text-xl mb-3 border-b border-[#FDC700] pb-2">
          Filter By Rating
        </h3>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((r) => (
            <label
              key={r}
              className="flex items-center gap-2 text-sm cursor-pointer hover:text-green-600 transition"
            >
              <input
                type="radio"
                name="rating"
                className="accent-[#FDC700]"
                onChange={() => setRating(r)}
              />
              <span className="text-yellow-500">
                {"★".repeat(r)}
              </span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SidebarFilters;
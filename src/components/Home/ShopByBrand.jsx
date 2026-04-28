import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShopByBrand = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "/api/wp-json/wc/v3/products/brands?per_page=20&consumer_key=ck_46b3ea052203228c821278503c5e8bd205bdb162&consumer_secret=cs_17182798cdfea4b3a33c399ab522b3ad0c48770e"
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((brand) => brand.image);
        setBrands(filtered);
      });
  }, []);

  return (
    <div className="mb-16 px-6">

      {/* 🔥 HEADER ROW */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold capitalize [#071A2D]">
          Shop By Brand
        </h2>

        <button
          onClick={() => navigate("/list/brands")}
          className="bg-[#071A2D] text-[#FDC700] px-5 py-2 transition"
        >
          View More
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-5">

        {brands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => navigate(`/brand/${brand.id}`)}
            className="text-center cursor-pointer p-4 rounded-xl bg-white shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            {/* IMAGE */}
            <div className="w-[90px] h-[90px] mx-auto mb-3 rounded-full overflow-hidden bg-gray-100">
              <img
                src={brand.image?.src}
                alt={brand.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* NAME */}
            <h4 className="text-sm font-semibold text-gray-800">
              {brand.name}
            </h4>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ShopByBrand;
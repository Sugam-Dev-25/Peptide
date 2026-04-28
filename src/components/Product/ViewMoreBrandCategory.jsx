import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewMoreBrandCategory = () => {
  const { type } = useParams(); // categories / brands
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getApiUrl = () => {
    switch (type) {
      case "categories":
        return "/api/wp-json/wc/v3/products/categories?per_page=50";

      case "brands":
        return "/api/wp-json/wc/v3/products/brands?per_page=50";

      default:
        return "";
    }
  };

  useEffect(() => {
    fetch(
      `${getApiUrl()}&consumer_key=ck_46b3ea052203228c821278503c5e8bd205bdb162&consumer_secret=cs_17182798cdfea4b3a33c399ab522b3ad0c48770e`
    )
      .then((res) => res.json())
      .then((data) => {
        // filter logic
        if (type === "categories") {
          const filtered = data.filter(
            (cat) => cat.slug !== "uncategorized"
          );
          setData(filtered);
        } else {
          const filtered = data.filter((item) => item.image);
          setData(filtered);
        }
      });
  }, [type]);

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 capitalize text-[#071A2D]">
        All {type}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              type === "categories"
                ? navigate(`/category/${item.id}`)
                : navigate(`/brand/${item.id}`)
            }
            className="text-center cursor-pointer p-4 bg-white shadow rounded-lg hover:shadow-xl"
          >
            <img
              src={item.image?.src}
              className="w-[80px] h-[80px] mx-auto mb-2 rounded-full"
            />

            <h4 className="font-semibold">{item.name}</h4>

            {type === "categories" && (
              <p className="text-xs text-gray-500">
                {item.count} items
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMoreBrandCategory;
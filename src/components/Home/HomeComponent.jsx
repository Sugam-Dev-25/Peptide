import React from "react";
import NewArrivals from "./NewArrivals";
import BestSellers from "./BestSellers";
import OnSale from "./OnSale";
import RecentlyViewed from "./RecentlyViewed";
import TopRated from "./TopRated";
import ShopByCategory from "./ShopByCategory";
import ShopByBrand from "./ShopByBrand";
import FeaturedProducts from "./FeaturedProducts";

const HomeComponent = () => {
  return (
    <div className="py-5">
      <NewArrivals />
      <FeaturedProducts/>
      <ShopByCategory />
      <BestSellers />
      <OnSale />
      <ShopByBrand />
      <TopRated />
      <RecentlyViewed />
    </div>
  );
};

export default HomeComponent;

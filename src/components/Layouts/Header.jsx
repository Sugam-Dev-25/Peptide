import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/cartSlice";
import {
  FaSearch,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaHome,
  FaFileAlt,
  FaBlog,
  FaTruck,
  FaMapSigns,
} from "react-icons/fa";

import { RiShoppingCart2Line } from "react-icons/ri";
import { TbHeart } from "react-icons/tb";
import { TiUserAddOutline } from "react-icons/ti";

const Header = () => {
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  return (
    <header className="w-full font-sans">
      {/* ================= TOP BAR ================= */}
      <div className="bg-[#061726] text-white text-sm px-6 py-2 flex justify-between items-center">
        <p className="flex items-center gap-2">
          <FaTruck className="text-yellow-400" />
          Free shipping for all orders of 150$
        </p>

        <div className="flex gap-6 items-center text-sm">
          <p className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition">
            <FaMapMarkerAlt className="text-yellow-400" />
            Store Locator
          </p>

          <p className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition">
            <FaMapSigns className="text-yellow-400" />
            Track Order
          </p>
        </div>
      </div>

      {/* ================= MIDDLE BAR ================= */}
      <div className="bg-[#071a2d] px-6 py-5 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-0 w-[35%]">
          {/* Search */}
          <div className="flex items-center bg-[#0c243f] w-full rounded-r-md overflow-hidden">
            <input
              type="text"
              placeholder="Keyword here..."
              className="bg-transparent px-4 py-3 w-full outline-none text-white"
            />
            <button className="px-4 text-white flex items-center gap-2">
              <FaSearch /> Search
            </button>
          </div>
        </div>

        {/* CENTER LOGO */}
        <div>
          <h1 className="text-3xl font-bold text-white tracking-widest">
            SHOPPING CART<span className="text-yellow-400">.</span>
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 w-[35%] justify-end">
          {/* Icons */}
          <div className="flex items-center gap-5 text-white text-xl">
            {/* 🛒 CART */}
            <div className="relative cursor-pointer">
              <RiShoppingCart2Line />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs px-2 py-[2px] rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </div>

            <TbHeart className="cursor-pointer" />

            <TiUserAddOutline className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* ================= BOTTOM NAV ================= */}
      <div className="bg-[#071a2d] border-t border-[#0c243f] px-6 py-4 flex justify-between items-center">
        {/* CENTER: MENU */}
        <div className="flex gap-10 text-white font-medium items-center">
          <span className="flex items-center gap-2 text-yellow-400 cursor-pointer hover:text-yellow-400">
            <FaHome /> Home +
          </span>

          <span className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
            <FaShoppingCart /> Shop +
          </span>

          <span className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
            <FaFileAlt /> Pages +
          </span>

          <span className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
            <FaBlog /> Blog +
          </span>

          <span className="flex items-center gap-2 cursor-pointer hover:text-yellow-400">
            <FaMapMarkerAlt /> Contact
          </span>
        </div>

        {/* RIGHT: SUPPORT */}
        <div className="text-right">
          <p className="text-yellow-400 text-sm font-semibold">
            Get Support:
            <span className="text-white font-semibold text-sm px-1">
              info@webexample.com
            </span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;

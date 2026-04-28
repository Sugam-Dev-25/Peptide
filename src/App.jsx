import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from "./components/Home/HomeComponent";
import CategoryProducts from "./components/Product/CategoryProducts";
import BrandProducts from "./components/Product/BrandProducts";
import Header from "./components/Layouts/Header";
import ProductDetails from "./components/Product/ProductDetails";
import ViewMoreProducts from "./components/Product/ViewMoreProducts";
import ViewMoreBrandCategory from "./components/Product/ViewMoreBrandCategory";
import RecentViewed from "./components/Product/RecentViewed";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/brand/:id" element={<BrandProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/:type" element={<ViewMoreProducts />} />
        <Route path="/list/:type" element={<ViewMoreBrandCategory />} />
        <Route path="/products/recent-viewed" element={<RecentViewed />} />
      </Routes>
    </Router>
  );
}

export default App;

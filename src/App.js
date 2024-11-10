import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageCoupons from "./components/Admin/Coupons/ManageCoupons";
import AddCoupon from "./components/Admin/Coupons/AddCoupon";
import Login from "./components/Users/Forms/Login";
import AddProduct from "./components/Admin/Products/AddProduct";
import RegisterForm from "./components/Users/Forms/RegisterForm";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import OrderHistory from "./components/Admin/Orders/ManageOrders";
import OrderPayment from "./components/Users/Products/OrderPayment";
import ManageCategories from "./components/Admin/Categories/ManageCategories";
import ManageStocks from "./components/Admin/Products/ManageStocks";
import CategoryToAdd from "./components/Admin/Categories/CategoryToAdd";
import AddCategory from "./components/Admin/Categories/AddCategory";
import AddBrand from "./components/Admin/Categories/AddBrand";
import AddColor from "./components/Admin/Categories/AddColor";
import AllCategories from "./components/HomePage/AllCategories";
import UpdateCoupon from "./components/Admin/Coupons/UpdateCoupon";
import Product from "./components/Users/Products/Product";
import ShoppingCart from "./components/Users/Products/ShoppingCart";
import ProductsFilters from "./components/Users/Products/ProductsFilters";
import CustomerProfile from "./components/Users/Profile/CustomerProfile";
import AddReview from "./components/Users/Reviews/AddReview";
import UpdateCategory from "./components/Admin/Categories/UpdateCategory";

import OrdersList from "./components/Admin/Orders/OdersList";
import ManageOrders from "./components/Admin/Orders/ManageOrders";
import Customers from "./components/Admin/Orders/Customers";
import BrandsList from "./components/Admin/Categories/BrandsList";
import AdminRoute from "./components/AuthRoute/AdminRoute";
import ThanksForOrdering from "./components/Users/Products/ThanksForOrdering";
import ProductUpdate from "./components/Admin/Products/ProductUpdate";
import UpdateOrders from "./components/Admin/Orders/UpdateOrders";
import ColorsList from "./components/Admin/Categories/ColorsList";
import { getUserProfileAction } from "./redux/slices/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthRoute from "./components/AuthRoute/AuthRoute";

const App = () => {
  //Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);
  //get user from local storage
  const { userAuth } = useSelector((state) => state?.users);
  const isAdmin = userAuth?.userInfo?.userFound?.isAdmin;
  return (
    <BrowserRouter>
      {!isAdmin && <Navbar />}
      <Navbar/>
      {/* hide navbar if admin */}
      <Routes>
        {/* nested route */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          {/* products */}
          <Route path="" element={<OrdersList />} />
          <Route
            path="add-product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="manage-products"
            element={
              <AdminRoute>
                <ManageStocks />
              </AdminRoute>
            }
          />
          <Route
            path="products/edit/:id"
            element={
              <AdminRoute>
                <ProductUpdate />
              </AdminRoute>
            }
          />
          {/* coupons */}
          <Route
            path="add-coupon"
            element={
              <AdminRoute>
                <AddCoupon />
              </AdminRoute>
            }
          />
          <Route
            path="manage-coupon"
            element={
              <AdminRoute>
                <ManageCoupons />
              </AdminRoute>
            }
          />
          <Route
            path="manage-coupon/edit/:code"
            element={
              <AdminRoute>
                <UpdateCoupon />
              </AdminRoute>
            }
          />
          {/* Category */}
          <Route
            path="category-to-add"
            element={
              <AdminRoute>
                <CategoryToAdd />
              </AdminRoute>
            }
          />{" "}
          <Route
            path="add-category"
            element={
              <AdminRoute>
                <AddCategory />
              </AdminRoute>
            }
          />
          <Route
            path="manage-category"
            element={
              <AdminRoute>
                <ManageCategories />
              </AdminRoute>
            }
          />
          <Route
            path="edit-category/:id"
            element={
              <AdminRoute>
                <UpdateCategory />
              </AdminRoute>
            }
          />
          {/* brand category */}
          <Route
            path="add-brand"
            element={
              <AdminRoute>
                <AddBrand />
              </AdminRoute>
            }
          />
          <Route path="all-brands" element={<BrandsList />} />
          {/* color category */}
          <Route
            path="add-color"
            element={
              <AdminRoute>
                <AddColor />
              </AdminRoute>
            }
          />
          <Route path="all-colors" element={<ColorsList />} />
          {/* Orders */}
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route path="orders/:id" element={<UpdateOrders />} />
          {/* <Route
            path="order-payment"
            element={
              <AdminRoute>
                <OrderPayment />
              </AdminRoute>
            }
          /> */}
          <Route
            path="customers"
            element={
              <AdminRoute>
                <Customers />
              </AdminRoute>
            }
          />
        </Route>
        {/* public links */}
        {/* Products */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products-filters" element={<ProductsFilters />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/success" element={<ThanksForOrdering />} />
        {/* review */}
        <Route
          path="/add-review/:id"
          element={
            <AuthRoute>
              <AddReview />
            </AuthRoute>
          }
        />
        {/* shopping cart */}
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route
          path="/order-payment"
          element={
            <AuthRoute>
              <OrderPayment />
            </AuthRoute>
          }
        />
        {/* users */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/customer-profile"
          element={
            <AuthRoute>
              <CustomerProfile />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

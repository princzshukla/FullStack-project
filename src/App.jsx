import WebFont from "webfontloader";
import Footer from "./components/layout/Footer/Footer.jsx";
import Header from "./components/layout/Header/Header.jsx";
import Login from "./components/user/Login.jsx";
import Register from "./components/user/Register.jsx";
import ForgotPassword from "./components/user/ForgetPassword.jsx";
import ResetPassword from "./components/user/ResetPassword.jsx";
import Account from "./components/user/Account.jsx";
import UpdateProfile from "./components/user/UpdateProfile.jsx";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import Sidebar from "./components/user/Sidebar.jsx";
import Products from "./components/products/products.jsx";
import Product from "./components/products/product.jsx";
import Cart from "./components/cart/cart.jsx";
import Shipping from "./components/cart/shipping.jsx";
import OrderConfirm from "./components/cart/OrderConfirm.jsx";
import Payment from "./components/cart/payment.jsx";
import OrderStatus from "./components/cart/Orderstatus.jsx";
import OrderSuccess from "./components/cart/OrderSuccess.jsx";
import MyOrders from "./components/order/Myorders.jsx";
import OrderDetails from "./components/order/OrderDetails.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import MainData from "./components/admin/MainData.jsx";
import OrderTable from "./components/admin/OrderTable.jsx";
import UpdateOrder from "./components/admin/UpdateOrder.jsx";
import ProductTable from "./components/admin/productTable.jsx";
import NewProduct from "./components/admin/NewProduct.jsx";
import UpdateProduct from "./components/admin/UpdateProduct.jsx";
import UserTable from "./components/admin/UserTable.jsx";
import UpdateUser from "./components/admin/UpdateUser.jsx";
import ReviewsTable from "./components/admin/ReviewsTable.jsx";
import Wishlist from "./components/wishList/wishList.jsx";
import ProtectedRoute from "./routes/protectedRoutes.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { loadUser } from "./actions/userActions.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NotFound from "./components/NotFound.jsx";
import Home from "./components/home/home.jsx";
import ProductDetails from "./components/productDetails/productDetails.jsx";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get('/api/v1/stripeapikey');
  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,600,700"],
      },
    });
  });

  useEffect(() => {
    dispatch(loadUser());
    // getStripeApiKey();
  }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // disable right click
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("keydown", (e) => {
    if (e.keyCode == 123) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  });

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/cart" element={<Cart />} />

        {/* order process */}
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <OrderConfirm />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/process/payment"
          element={
            <ProtectedRoute>
              {/* // stripeApiKey && ( */}
              {/* // <Elements stripe={loadStripe(stripeApiKey)}> */}
              <Payment />
              {/* // </Elements> */}
              {/* ) */}
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/orders/success"
          element={<OrderSuccess success={true} />}
        />
        <Route
          path="/orders/failed"
          element={<OrderSuccess success={false} />}
        />
        {/* order process */}

        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderStatus />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/order_details/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/account/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard activeTab={0}>
                <MainData />
              </Dashboard>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard activeTab={1}>
                <OrderTable />
              </Dashboard>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard activeTab={1}>
                <UpdateOrder />
              </Dashboard>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard activeTab={2}>
                <ProductTable />
              </Dashboard>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/new_product"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard activeTab={3}>
                <NewProduct />
              </Dashboard>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard activeTab={2}>
                <UpdateProduct />
              </Dashboard>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard activeTab={4}>
                <UserTable />
              </Dashboard>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard activeTab={4}>
                <UpdateUser />
              </Dashboard>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard activeTab={5}>
                <ReviewsTable />
              </Dashboard>
            </ProtectedRoute>
          }
        ></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../src/Redux/Store.js";
import { Toaster } from "react-hot-toast";
import Spinner from "./Components/Spinner/Spinner.jsx";

// Lazy load components
const App = lazy(() => import("./App.jsx"));
const Shop = lazy(() => import("./Components/Shop/Shop.jsx"));
const HomePage = lazy(() => import("./Components/Home/Homepage.jsx"));
const WhishList = lazy(() => import("./Components/Cart/WhishList.jsx"));
const Checkout = lazy(() => import("./Components/Checkout/Checkout.jsx"));
const ViewCart = lazy(() => import("./Components/Cart/ViewCart.jsx"));
const SingleProduct = lazy(() =>
  import("./Components/Product/SingleProduct.jsx")
);
const Signup = lazy(() => import("./Components/Signup/SignUp.jsx"));
const Login = lazy(() => import("./Components/Login/Login.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/viewcart", element: <ViewCart /> },
      { path: "/wishlist", element: <WhishList /> },
      { path: "/wishlist/:id", element: <SingleProduct /> },
      { path: "/shop", element: <Shop /> },
      { path: "/shop/singleproduct/:id", element: <SingleProduct /> },
      { path: "/viewcart/singleproduct/:id", element: <SingleProduct /> },
      { path: "/singleproduct/:id", element: <SingleProduct /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <Suspense fallback={<Spinner />}>
          <Toaster />
          <RouterProvider router={router} />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

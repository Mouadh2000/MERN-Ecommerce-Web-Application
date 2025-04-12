import Home from "./pages/Home";
import AboutUs from "./pages/About/AboutUs";
import Contact from "./pages/About/Contact";
import Shop from "./pages/Shop/Shop";
import ShopCart from "./pages/Shop/ShopCart";
import ShopCheckOut from "./pages/Shop/ShopCheckOut";
import StoreList from "./pages/store/StoreList";
import SingleShop from "./pages/store/SingleShop";
import MyAccountOrder from "./pages/Accounts/MyAccountOrder";
import MyAccountSetting from "./pages/Accounts/MyAcconutSetting";
import MyAccountSignIn from "./pages/Accounts/MyAccountSignIn";
import MyAccountSignUp from "./pages/Accounts/MyAccountSignUp";

const routes = [
  { path: "/", element: <Home /> },

  // Shop pages
  { path: "/Shop", element: <Shop /> },
  { path: "/ShopCheckOut", element: <ShopCheckOut />, requiresAuth: true,},
  { path: "/ShopCart", element: <ShopCart /> },

  // Store pages
  { path: "/StoreList", element: <StoreList /> },
  { path: "/SingleShop", element: <SingleShop /> },

  // Account pages
  { path: "/MyAccountOrder", element: <MyAccountOrder /> },
  { path: "/MyAccountSetting", element: <MyAccountSetting /> },
  { path: "/MyAccountSignIn", element: <MyAccountSignIn /> },
  { path: "/MyAccountSignUp", element: <MyAccountSignUp /> },

  // About pages
  { path: "/Contact", element: <Contact /> },
  { path: "/AboutUs", element: <AboutUs /> },
];

export default routes;

import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import routes from "./routes";
import ProtectedRoute from "./context/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
const App = () => {
  return (
    <>
      <CartProvider>
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<ProtectedRoute
              element={route.element}
              requiresAuth={route.requiresAuth}
            />
            } 
            />
            ))}
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
};

export default App;

import React from "react";
import Grocerylogo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {

  const { cartItems } = useCart();
  const { isLoggedIn, currentUser, logout } = useAuth();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={Grocerylogo}
              style={{ width: 200, marginBottom: 10, marginLeft: "-25px" }}
              alt="ecodattes"
            />
          </Link>
      <div className="collapse navbar-collapse" id="mobile_nav">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 float-md-right"></ul>
        <ul className="navbar-nav navbar-light">
          <li className="nav-item">
            <Link className="nav-link" to="/">
            Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/AboutUs"
              role="button"
            >
              À propos
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/Shop"
            >
              Magasin
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/Contact"
            >
             Contactez-Nous

            </Link>
            
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/ShopCart"
            >
              <i className="fas fa-shopping-cart"></i>
              {cartItems.length > 0 && <span>{cartItems.length}</span>}
            </Link>
          </li>
          {isLoggedIn ? (
  <li className="nav-item dropdown">
    <Link
      className="nav-link dropdown-toggle d-flex align-items-center"
      to="#"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {currentUser.data.profileImage && (
        <img 
          src={`data:image/jpeg;base64,${currentUser.data.profileImage}`} 
          alt="Profile" 
          className="rounded-circle me-2"
          style={{ width: '30px', height: '30px', objectFit: 'cover' }}
        />
      )}
      {currentUser.data.username || 'Account'}
    </Link>
    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
      <li>
        <Link className="dropdown-item" to="/MyAccountOrder">
          Mes commandes
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/MyAccountSetting">
        Paramètres
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <button className="dropdown-item" onClick={logout}>
          Se Déconnecter
        </button>
      </li>
    </ul>
  </li>
) : (
  <li className="nav-item">
    <Link className="nav-link" to="/MyAccountSignIn">
      Connexion
    </Link>
  </li>
)}
        </ul>
      </div>
    </div>
    </nav >

    </div >
  );
};

export default Header;

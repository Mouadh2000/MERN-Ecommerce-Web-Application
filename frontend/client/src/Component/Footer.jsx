import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import groceryshop from "../images/logo.png";
import amazonpay from "../images/amazonpay.svg";
import american from "../images/american-express.svg";
import mastercard from "../images/mastercard.svg";
import paypal from "../images/paypal.svg";
import visa from "../images/visa.svg";
import { getAllCategory } from "../Api/CategoryApi";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  let date = new Date();
  let year = date.getFullYear();

  useEffect(() => {
    getAllCategory()
      .then((res) => {
        setCategories(res.data || []);
      })
      .catch((err) => console.error("Erreur de récupération des catégories :", err));
  }, []);

  return (
    <footer className="footer mt-8">
      <div className="overlay" />
      <div className="container">
        <div className="row footer-row">
          <div className="col-sm-6 col-lg-3 mb-30">
            <div className="footer-widget">
              <div className="footer-logo">
                <Link to="/">
                  <img
                    src={groceryshop}
                    style={{ width: 300, padding: 20, marginLeft: "-30px" }}
                    alt="logo"
                  />
                </Link>
              </div>
              <p className="mb-30">
                Nous sommes producteur, conditionneur et exportateur. Notre entreprise est une référence en Tunisie dans la transformation et l'exportation de dattes Deglet Nour fraîches et sèches de haute qualité.
              </p>
            </div>
            <div className="dimc-protect">
              <div className="col-lg-5 text-lg-start text-center mb-2 mb-lg-0">
                <h4>Partenaires de Paiement</h4>
                <ul className="list-inline d-flex mb-0">
                  {[amazonpay, american, mastercard, paypal, visa].map((img, idx) => (
                    <li className="list-inline-item" key={idx}>
                      <Link to="#!">
                        <img src={img} alt="mode-paiement" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-30">
            <div className="footer-widget mb-0">
              <h4>Toutes les Catégories</h4>
              <div className="line-footer" />
              <div className="row">
                <div className="col">
                  <ul className="footer-link mb-0">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link to="#">
                          <span><i className="fa fa-angle-right" /></span> {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-30">
            <div className="footer-widget mb-0">
              <h4>Pour les Consommateurs</h4>
              <div className="line-footer" />
              <div className="row">
                <div className="col">
                  <ul className="footer-link mb-0">
                    <li><Link to=" "><span><i className="fa fa-angle-right" /></span> Carrières</Link></li>
                    <li><Link to="/ShopCart"><span><i className="fa fa-angle-right" /></span> Promotions & Coupons</Link></li>
                    <li><Link to="/MyAccountOrder"><span><i className="fa fa-angle-right" /></span> Livraison</Link></li>
                    <li><Link to="/MyAccountOrder"><span><i className="fa fa-angle-right" /></span> Retours de Produits</Link></li>
                    <li><Link to="/#!"><span><i className="fa fa-angle-right" /></span> Paiements</Link></li>
                    <li><Link to="/Contact"><span><i className="fa fa-angle-right" /></span> FAQ</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3 mb-30">
            <div className="footer-widget mb-0">
              <h4>À propos de nous</h4>
              <div className="line-footer" />
              <div className="row">
                <div className="col">
                  <ul className="footer-link mb-0">
                    <li><Link to="/AboutUs"><span><i className="fa fa-angle-right" /></span> Société</Link></li>
                    <li><Link to="/AboutUs"><span><i className="fa fa-angle-right" /></span> À propos</Link></li>
                    <li><Link to="/#!"><span><i className="fa fa-angle-right" /></span> Blog</Link></li>
                    <li><Link to="/Contact"><span><i className="fa fa-angle-right" /></span> Centre d'Aide</Link></li>
                    <li><Link to="/#!"><span><i className="fa fa-angle-right" /></span> Nos Valeurs</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-widget mt-8">
              <div className="newsletter-item">
                <input
                  type="email"
                  id="email"
                  placeholder="Votre Email"
                  className="form-control form-control-lg"
                  required
                />
                <button type="submit">
                  <i className="fa fa-paper-plane" />
                </button>
              </div>
              <ul className="social-media" style={{ display: "flex", gap: 10 }}>
                <li><Link to="#" className="facebook"><i className="bx bxl-facebook" /></Link></li>
                <li><Link to="#" className="twitter"><i className="bx bxl-twitter" /></Link></li>
                <li><Link to="#" className="instagram"><i className="bx bxl-instagram" /></Link></li>
                <li><Link to="#" className="linkedin"><i className="bx bxl-linkedin" /></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="container text-center">
          <div className="footer-copy">
            <div className="copyright">
              © {year} Tous droits réservés{" "}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

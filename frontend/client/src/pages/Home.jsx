import slider1 from "../images/home-cover.jpg";
import abouticon from "../images/logo.png";
import slider2 from "../images/home-cover.jpg";
import adbanner1 from "../images/dattes-banner-4.jpg";
import adbanner2 from "../images/dattes-banner.jpg";
import adbanner3 from "../images/dattes-banner-2.jpg";
import map from "../images/map.png";
import iphone from "../images/iphone-2.png";
import googleplay from "../images/googleplay-btn.svg";
import appstore from "../images/appstore-btn.svg";
import clock from "../images/clock.svg";
import gift from "../images/gift.svg";
import package1 from "../images/package.svg";
import refresh from "../images/refresh-cw.svg";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import ProductItem from "../ProductList/ProductItem";
import { Slide, Zoom } from "react-awesome-reveal";
import { useEffect } from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  
  // loading
  const [loaderStatus, setLoaderStatus] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoaderStatus(false);
    }, 1500);
  }, []);

  return (
    <div>
      <div>
        {loaderStatus ? (
          <div className="loader-container">
            {/* <PulseLoader loading={loaderStatus} size={50} color="#0aad0a" /> */}
            <MagnifyingGlass
              visible={true}
              height="100"
              width="100"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperclassName="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#0aad0a"
            />
          </div>
        ) : (
          <>
            <>
              <div className="scroll-to-top">
                <button
                  onClick={scrollToTop}
                  className={`scroll-to-top-button ${isVisible ? "show" : ""}`}
                >
                  ↑
                </button>
              </div>
              <section className="hero-section">
                <div className="container mt-8">
                  <div
                    id="carouselExampleFade"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div
                          style={{
                            background: `url(${slider1}) no-repeat`,
                            backgroundSize: "cover",
                            borderRadius: ".5rem",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
                            <span className="badge text-bg-warning">
                              Opening Sale Discount 50%
                            </span>
                            <h2 className="text-dark display-5 fw-bold mt-4">
                            Supermarché tous les jours
                            </h2>
                            
                            <Link to="#!" className="btn btn-dark mt-3">
                              Magasiner Maintenant{" "}
                              <i className="feather-icon icon-arrow-right ms-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div
                          style={{
                            background: `url(${slider2}) no-repeat`,
                            backgroundSize: "cover",
                            borderRadius: ".5rem",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
                            <span className="badge text-bg-warning">
                              Free Shipping - orders over $100
                            </span>
                            <h2 className="text-dark display-5 fw-bold mt-4">
                              Free Shipping on <br /> orders over{" "}
                              <span className="text-primary">$100</span>
                            </h2>
                            <p className="lead">
                              Free Shipping to First-Time Customers Only, After
                              promotions and discounts are applied.
                            </p>
                            <Link to="#!" className="btn btn-dark mt-3">
                              Shop Now{" "}
                              <i className="feather-icon icon-arrow-right ms-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      className="carousel-control-prev"
                      to="#carouselExampleFade"
                      role="button"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Previous</span>
                    </Link>
                    <Link
                      className="carousel-control-next"
                      to="#carouselExampleFade"
                      role="button"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Next</span>
                    </Link>
                  </div>
                </div>
              </section>
            </>
            <>
              <section className="mt-8">
                {/* contianer */}
                <div className="container ">
                  <div className="row">
                    {/* col */}
                    <Slide direction="down">
                      <div className="col-12">
                        {/* cta */}
                        <div className="bg-light d-lg-flex justify-content-between align-items-center py-6 py-lg-3 px-8 rounded-3 text-center text-lg-start">
                          {/* img */}
                          <div className="d-lg-flex align-items-center">
                            <img
                              src={abouticon}
                              alt="about-icon"
                              className="img-fluid"
                              style={{width: "200px"}}
                            />
                            {/* text */}
                            <div className="ms-lg-4">
                              <h1 className="fs-2 mb-1">
                              Bienvenue chez Ecodattes
                              </h1>
                              
                            </div>
                          </div>
                          <div className="mt-3 mt-lg-0">
                            {/* btn */}
                            <Link to="#" className="btn btn-dark">
                            Télécharger l'application Ecodattes
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Slide>
                  </div>
                </div>
              </section>
            </>
            <>
              {/* section */}
              <section className="mt-8">
                <div className="container">
                  {/* row */}
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12 fade-in-left" >
                      <Slide direction="left">
                        <div className=" banner mb-5" >
                          {/* Banner Content */}
                          <div className="position-relative">
                            {/* Banner Image */}
                            <img
                              src={adbanner1}
                              alt="ad-banner"
                              className="img-fluid rounded-3 w-100"
                            />
                            <div className="banner-text">
                              <h3 className="mb-2 fw-bold">
                              10 % de remise <br />
                              sur les soins personnels{" "}
                              </h3>
                              <div className="mt-4 mb-5 fs-5">
                                                                
                              </div>
                              <Link to="#" className="btn btn-dark" >
                                Magasiner Maintenant
                              </Link>
                            </div>
                            {/* Banner Content */}
                          </div>
                        </div>
                      </Slide>
                    </div>

                    <div className="col-lg-4 col-md-6  col-12 slide-in-top">
                      <Zoom>
                        <div className="banner mb-3 ">
                          {/* Banner Content */}
                          <div className="position-relative">
                            {/* Banner Image */}
                            <img
                              src={adbanner2}
                              alt="ad-banner-2"
                              className="img-fluid rounded-3 w-100"
                            />
                            <div className="banner-text">
                              {/* Banner Content */}
                              <h3 className=" fw-bold mb-2">
                                
                                Dites oui à <br />
                                la fraîcheur de la saison{" "}
                              </h3>
                              <p className="fs-5">
                               
                              </p>
                              <Link to="#" className="btn btn-dark" style={{marginTop: "3.7rem"}}>
                              Magasiner Maintenant
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Zoom>
                    </div>
                    <div className="col-lg-4 col-12 fade-in-left ">
                      <Slide direction="right">
                        <div className="banner mb-3">
                          <div className="banner-img">
                            {/* Banner Image */}
                            <img
                              src={adbanner3}
                              alt="ad-banner-3"
                              className="img-fluid rounded-3 w-100"
                            />
                            {/* Banner Content */}
                            <div className="banner-text">
                              <h3 className="fs-2 fw-bold lh-1 mb-2">
                              En cas de doute,
                                <br />
                                mangez les dattes{" "}
                              </h3>
                              <p className="fs-5">
                                
                              </p>
                              <Link to="#" className="btn btn-dark" style={{marginTop: "4rem"}}>
                              Magasiner Maintenant
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Slide>
                    </div>
                  </div>
                </div>
              </section>
              {/* section */}
            </> 
            <>
              <ProductItem />
            </>
            <>
              {/* cta section */}
              <section>
                <div
                  className="container"
                  style={{
                    background: `url(${map})no-repeat`,
                    backgroundSize: "cover",
                  }}
                >
                  {/* <hr className="my-lg-14 my-8"> */}
                  {/* row */}
                  <div className="row align-items-center text-center justify-content-center">
                    <div className=" col-lg-6 col-md-6 fade-in-left">
                      <Slide direction="left">
                        <div className="mb-6">
                          <div className="mb-7">
                            {/* heading */}
                            <h1>
                            Téléchargez l'application Ecodattes</h1>
                            
                          </div>
                          <div className="mb-5">
                            {/* form check */}
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault1"
                              >
                                Email
                              </label>
                            </div>
                            {/* form check */}
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault2"
                              >
                                Phone
                              </label>
                            </div>
                            {/* form */}
                            {/* <form className="row g-3 mt-2">

          
          <div className="col-6 ">
            
            <input type="text" className="form-control" placeholder="Phone">
          </div>
           
          <div className="col-6">
            <button type="submit" className="btn btn-primary mb-3">Share app link</button>
          </div>
        </form> */}
                          </div>
                          <div>
                            {/* app */}
                            {/* <small>Download app from</small> */}
                            <ul className="list-inline mb-0 mt-2 ">
                              {/* list item */}
                              <li className="list-inline-item">
                                {/* img */}
                                <Link to="#!">
                                  {" "}
                                  <img
                                    src={appstore}
                                    alt="appstore"
                                    style={{ width: 140 }}
                                  />
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                {/* img */}
                                <Link to="#!">
                                  {" "}
                                  <img
                                    src={googleplay}
                                    alt="googleplay"
                                    style={{ width: 140 }}
                                  />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Slide>
                    </div>
                    <div className=" offset-lg-2 col-lg-4 col-md-6 fade-zoom">
                      <Slide direction="right">
                        <div className="text-lg-start">
                          {/* img */}
                          <img
                            src={iphone}
                            alt="iphone"
                            className=" img-fluid"
                          />
                        </div>
                      </Slide>
                    </div>
                  </div>
                  {/* <hr className="my-lg-14 my-8"> */}
                </div>
              </section>
            </>
            <>
            <section className="my-lg-14 my-8">
              <div className="container" style={{ marginTop: 50 }}>
                <div
                  className="row justify-content-center  g-4"
                  style={{ textAlign: "center" }}
                >
                  <div className="col-md-3 col-sm-6 fade-zoom ">
                    <Zoom>
                      <div className="shadow-effect">
                        <div className="wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect">
                          <div className="icon-lg m-b20">
                            <div className="mb-6">
                              <img src={refresh} alt="refresh" />
                            </div>
                          </div>
                          <div className="icon-content">
                            <h3 className="h5 mb-3">Retours Faciles</h3>
                            <p>
                              Pas satisfait d’un produit ? Retournez-le à votre porte et
                              recevez un remboursement en quelques heures. Aucune question posée
                              <Link to="#!">politique</Link>.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Zoom>
                  </div>
                  <div className="col-md-3 col-sm-12 fade-zoom">
                    <Zoom>
                      <div className="shadow-effect">
                        <div className="wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect">
                          <div className="icon-lg m-b20">
                            <div className="mb-6">
                              <img src={package1} alt="package" />
                            </div>
                          </div>
                          <div className="icon-content">
                            <h3 className="h5 mb-3">Large Choix</h3>
                            <p>
                              Choisissez parmi plus de 5000 produits : alimentation, soins
                              personnels, ménage, boulangerie, produits végétariens et non
                              végétariens, et bien d'autres catégories.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Zoom>
                  </div>
                  <div className="col-md-3 col-sm-12 fade-zoom">
                    <Zoom>
                      <div className="shadow-effect">
                        <div className="wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect">
                          <div className="icon-lg m-b20">
                            <div className="mb-6">
                              <img src={gift} alt="gift" />
                            </div>
                          </div>
                          <div className="icon-content">
                            <h3 className="h5 mb-3">Meilleurs Prix &amp; Offres</h3>
                            <p>
                              Des prix plus bas que votre supermarché local, avec des offres
                              de remboursement exceptionnelles. Profitez des meilleurs prix
                              et offres.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Zoom>
                  </div>
                  <div className="col-md-3 col-sm-12 fade-zoom">
                    <Zoom>
                      <div className="shadow-effect">
                        <div className="wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect">
                          <div className="icon-lg m-b20">
                            <div className="mb-6">
                              <img src={clock} alt="clock" />
                            </div>
                          </div>
                          <div className="icon-content">
                            <h3 className="h5 mb-3">Courses en 10 minutes</h3>
                            <p>
                              Faites-vous livrer votre commande à domicile le plus rapidement possible
                              depuis les magasins FreshCart
                            </p>
                            <p>près de chez vous.</p>
                          </div>
                        </div>
                      </div>
                    </Zoom>
                  </div>
                </div>
              </div>
            </section>

            </>
           
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

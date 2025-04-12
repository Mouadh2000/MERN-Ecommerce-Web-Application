import React, { useEffect, useState } from "react";
import clutch from "../../images/clutch-dark.png";
import member1 from "../../images/about2.jpg";
import member3 from "../../images/about3.jpg";
import idea from "../../images/idea.gif";
import team from "../../images/team.gif";
import award from "../../images/award.gif";

import flipkartlogo from "../../images/flipkartlogo.png";
import amazonlogo from "../../images/amazonlogo.png";
import blinkit from "../../images/blinkit.png";
import smartshop from "../../images/smartshop.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import CaseStudySlider from "./CaseStudySlider";
import { MagnifyingGlass } from "react-loader-spinner";
import { Slide, Zoom } from "react-awesome-reveal";
import ScrollToTop from "../ScrollToTop";

const AboutUs = () => {
  // loading
  const [loaderStatus, setLoaderStatus] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoaderStatus(false);
    }, 1000);
  }, []);

  return (
    <div>
      <div>
        {loaderStatus ? (
          <div className="loader-container">
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
          <ScrollToTop/>
          </>
            <>
              {/* Hero */}
              <section className="position-relative pt-5">
                {/* Background */}
                <div
                  className="position-absolute top-0 start-0 w-100 bg-position-bottom-center bg-size-cover bg-repeat-0"
                  style={{
                    backgroundImage: "url(assets/img/about/hero-bg.svg)",
                  }}
                >
                  <div className="d-lg-none" style={{ height: 960 }} />
                  <div className="d-none d-lg-block" style={{ height: 768 }} />
                </div>
                {/* Content */}
                <div className="container position-relative zindex-5 pt-5">
                  <div className="row">
                    <div className="col-lg-6">
                      {/* Breadcrumb */}

                      {/* Text */}
                      <Slide direction="down">
                      <h1 className="pb-2 pb-md-3">À propos d'Ecodattes</h1>
                      <p
                        className="fs-xl pb-4 mb-1 mb-md-2 mb-lg-3"
                        style={{ maxWidth: 526 }}
                      >
                  Issus d'une lignée de cultivateurs de palmiers dattiers, notre savoir-faire unique s'est transmis de génération en génération. Notre entreprise possède une histoire de compétences hautement qualifiées qui vont de la pollinisation des palmiers à l'expédition des dattes emballées, en passant par tout un processus de transformation et d'emballage rigoureux.

Nichés au cœur du Sahara dans le sud de la Tunisie, nos palmeraies sont la fierté de nos producteurs de dattes, qui maîtrisent avec brio toutes les subtilités de nos variétés de dattes. Ces mêmes dattes sont bénies par la terre et forgées par le temps pour vous offrir le plaisir de déguster un fruit miraculeux aux mille et un bienfaits.
Ecodattes est une entreprise tunisienne spécialisée dans la transformation, l'emballage et l'exportation de produits à base de dattes. Nous exportons nos fruits vers l'Europe, l'Asie, l'Afrique et l'Amérique.
                      </p>
                      <img
                        src={clutch}
                        className=" d-dark-mode-none"
                        width={175}
                        alt="Clutch"
                      />
                      <img
                        src="assets/img/about/clutch-light.png"
                        className="d-none d-dark-mode-block"
                        width={175}
                        alt="Clutch"
                      />
                      <div className="row row-cols-3 pt-4 pt-md-5 mt-2 mt-xl-4">
                        <div className="col">
                          <h3 className="h2 mb-2">2 480</h3>
                          <p className="mb-0">
                            <strong>Experts</strong> en Vente à Distance
                          </p>
                        </div>
                        <div className="col">
                          <h3 className="h2 mb-2">760</h3>
                          <p className="mb-0">
                            <strong>Nouveaux Clients</strong> par Mois
                          </p>
                        </div>
                        <div className="col">
                          <h3 className="h2 mb-2">1 200</h3>
                          <p className="mb-0">
                            <strong>Demandes</strong> par Semaine
                          </p>
                        </div>
                      </div>
                      </Slide>
                    </div>
                    {/* Images */}
                    <div className="col-lg-6 mt-xl-3 pt-5 pt-lg-4">
                      <div className="row row-cols-2 gx-3 gx-lg-4">
                        <div className="col pt-lg-5 mt-lg-1">
                          <Zoom>
                          <img
                            src={member1}
                            className="d-block rounded-3 mb-3 mb-lg-4"
                            alt="member"
                          />
                          </Zoom>
                        </div>
                        <div className="col">
                          <Zoom>
                          <img
                            src={member3}
                            className="d-block rounded-3 mb-3 mb-lg-4"
                            alt="member"
                          />
                          </Zoom>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
            <>
              <section className="container mt-8 mb-5 pt-lg-5" id="benefits">
                <Swiper
                  className="swiper pt-3"
                  modules={[]}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    500: { slidesPerView: 2 },
                    991: { slidesPerView: 3 },
                  }}
                >
                  <div className="swiper-wrapper pt-4">
                    <SwiperSlide className="swiper-slide border-end-lg px-2">
                      <div className="text-center">
                        <Zoom>
                        <img
                          src={idea}
                          width="100"
                          alt="Bulb icon"
                          className="d-block mb-4 mx-auto"
                        />
                        </Zoom>
                        <Slide direction="up">
                        <h4 className="mb-2 pb-1">Solutions Créatives</h4>
                        <p className="mx-auto" style={{ maxWidth: "336px" }}>
                          Sed morbi nulla pulvinar lectus tempor vel euismod
                          accumsan.
                        </p>
                        </Slide>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide border-end-lg px-2">
                      <div className="text-center">
                        <Zoom>
                        <img
                          src={award}
                          width="100"
                          alt="Award icon"
                          className="d-block mb-4 mx-auto"
                        />
                        </Zoom>
                        <Slide direction="up">
                        <h4 className="mb-2 pb-1">Prix Récompensés</h4>
                        <p className="mx-auto" style={{ maxWidth: "336px" }}>
                          Sit facilisis dolor arcu, fermentum vestibulum arcu
                          elementum imperdiet.
                        </p>
                        </Slide>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide px-2">
                      <div className="text-center">
                        <Zoom>
                        <img
                          src={team}
                          width="100"
                          alt="Team icon"
                          className="d-block mb-4 mx-auto"
                        />
                        </Zoom>
                        <Slide direction="up">
                        <h4 className="mb-2 pb-1">Équipe de Professionnels</h4>
                        <p className="mx-auto" style={{ maxWidth: "336px" }}>
                          Nam venenatis urna aenean quis feugiat et senectus
                          turpis.
                        </p>
                        </Slide>
                      </div>
                    </SwiperSlide>
                  </div>
                  <div className="swiper-pagination position-relative pt-2 pt-sm-3 mt-4"></div>
                </Swiper>
              </section>
            </>
            <>
              {/* Awards */}
              <section className="container mt-8 mb-5 pb-3 pb-md-4 pb-lg-5">
                <div className="row gy-4 py-xl-2">
                  <div className="col-md-4">
                    <div className="info-whydiff">
                      <div className="section-title-left pt-80">
                        <h3 className="party" style={{ fontSize: "38px" }}>
                          <Slide direction="down" delay={0.5}>
                          Nos Partenaires
                          </Slide>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 offset-lg-1 col-md-8">
                    <div className="row row-cols-sm-4 row-cols-2 gy-4">
                      <div className="col">
                        <div className="position-relative text-center">
                          <Zoom>
                          <img
                            src={flipkartlogo}
                            width={100}
                            alt="Webby"
                            className="d-block mx-auto mb-3"
                          />
                          </Zoom>
                          <Link
                            to="#"
                            className="text-body justify-content-center fs-sm stretched-link text-decoration-none"
                          >
                            4x mobile du jour
                          </Link>
                        </div>
                      </div>
                      <div className="col">
                        <div className="position-relative text-center">
                          <Zoom>
                          <img
                            src={amazonlogo}
                            width={100}
                            alt="CSSDA"
                            className="d-block mx-auto mb-3"
                          />
                          </Zoom>
                          <Link
                            to="#"
                            className="text-body justify-content-center fs-sm stretched-link text-decoration-none"
                          >
                            1x Kudos
                          </Link>
                        </div>
                      </div>
                      <div className="col">
                        <div className="position-relative text-center">
                          <Zoom>
                          <img
                            src={blinkit}
                            width={100}
                            alt="Awwwards"
                            className="d-block mx-auto mb-3"
                          />
                          </Zoom>
                          <Link
                            to="#"
                            className="text-body justify-content-center fs-sm stretched-link text-decoration-none"
                          >
                            3x site du jour
                          </Link>
                        </div>
                      </div>
                      <div className="col">
                        <div className="position-relative text-center">
                          <Zoom>
                          <img
                            src={smartshop}
                            width={100}
                            alt="FWA"
                            className="d-block mx-auto mb-3"
                          />
                          </Zoom>
                          <Link
                            to="#"
                            className="text-body justify-content-center fs-sm stretched-link text-decoration-none"
                          >
                            2x meilleur site
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
            <>
              <CaseStudySlider />
            </>
          </>
        )}
      </div>
    </div>
  );
};
export default AboutUs;
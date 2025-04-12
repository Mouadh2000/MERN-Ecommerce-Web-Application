import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import member1 from "../../images/01.jpg";
import member2 from '../../images/02.jpg'
import member3 from "../../images/03.jpg";
import { Slide } from "react-awesome-reveal";

const Testimonials = () => {
  const [carouselOptions] = useState({
    loop: true,
    margin: 30,
    nav: false,
    autoplay: true,
    autoplayTimeout: 30555500,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

  useEffect(() => {
    // Mettre à jour les options du carrousel si nécessaire
    // setCarouselOptions(prevOptions => ({
    //   ...prevOptions,
    //   // Mettre à jour les options ici
    // }));
  }, []);

  return (
    <div className="container">
      <div id="testimonials" className="testimonials-one ptb-50">
        <div className="overlay"></div>

        <div className="row" style={{padding:'20px'}}>
          <div className="col-md-6" style={{padding:'30px'}}>
            <div className="info-whydiff">
              <div className="section-title-left pt-80">
                <Slide direction="down" delay={0.3}>
                <h3 className="party">
                  Écoutez nos
                  <br />
                  clients satisfaits !
                </h3>
                </Slide>
              </div>
            </div>
          </div>
          <div className="col-md-6" style={{padding:'20px'}}>
            <OwlCarousel
              className="owl-carousel testimonial-one owl-theme owl-loaded owl-drag"
              {...carouselOptions}
            >
              {/* Éléments de témoignage */}
              <div className="testmonail-item">
                {/* <div class="owl-item"> */}
                <div className="testmonail-box">
                  <div className="client-img">
                    <img src={member1} alt="Client" />
                    <div className="quote-icon">
                      <i className="fa fa-quote-left fa-2x" />
                    </div>
                  </div>
                  <div className="inner-test">
                    <p className="text">
                      "Nous sommes ravis de notre collaboration avec TheJointApps !
                      Ils ont fait preuve d'un grand professionnalisme et d'un engagement
                      remarquable même pour les tâches les plus complexes. Nous leur souhaitons
                      tout le meilleur !"
                    </p>
                  </div>
                  <div className="author-details mt-3">
                    <h6>Rabie Elkheir</h6>
                    <span>Notre client</span>
                  </div>
                </div>
                {/* </div> */}
              </div>

              <div className="testmonail-item">
                {/* <div class="owl-item"> */}
                <div className="testmonail-box">
                  <div className="client-img">
                    <img src={member2} alt="Client" />
                    <div className="quote-icon">
                      <i className="fa fa-quote-left fa-2x" />
                    </div>
                  </div>
                  <div className="inner-test">
                    <p className="text">
                      "TheJointApps a joué un rôle clé dans la construction de notre présence web.
                      Ils ont créé pour nous un site web incroyable - à la fois esthétiquement plaisant
                      et fonctionnellement solide."
                    </p>
                  </div>
                  <div className="author-details mt-3">
                    <h6>Sara Wander</h6>
                    <span>Notre client</span>
                  </div>
                </div>
                {/* </div> */}
              </div>
              <div className="testmonail-item">
                {/* <div class="owl-item"> */}
                <div className="testmonail-box">
                  <div className="client-img">
                    <img src={member3} alt="Client" />
                    <div className="quote-icon">
                      <i className="fa fa-quote-left fa-2x" />
                    </div>
                  </div>
                  <div className="inner-test">
                    <p className="text">
                      "L'équipe de TheJointApps a fait preuve d'un professionnalisme exceptionnel
                      et a été très patiente avec nous tout au long du processus de développement
                      de notre application mobile. Nous sommes ravis d'avoir collaboré avec eux."
                    </p>
                  </div>
                  <div className="author-details mt-3">
                    <h6>Nour Eldin</h6>
                    <span>Notre client</span>
                  </div>
                </div>
                {/* </div> */}
              </div>

              {/* Ajouter plus d'éléments de témoignage ici */}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
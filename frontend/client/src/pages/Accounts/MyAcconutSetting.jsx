import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import ScrollToTop from "../ScrollToTop";

const ParametresCompte = () => {
  const [loaderStatus, setLoaderStatus] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoaderStatus(false);
    }, 1500);
  }, []);

  return (
    <div>
      <>
        <ScrollToTop />
      </>
      <>
        <div>
          {/* section */}
          <section>
            {/* conteneur */}
            <div className="container">
              {/* ligne */}
              <div className="row">
                <div className="col-lg-9 col-md-8 col-12">
                  <div>
                    {loaderStatus ? (
                      <div className="loader-container">
                        <MagnifyingGlass
                          visible={true}
                          height="100"
                          width="100"
                          ariaLabel="chargement-loupe"
                          wrapperStyle={{}}
                          wrapperclassName="loupe-wrapper"
                          glassColor="#c0efff"
                          color="#0aad0a"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="p-6 p-lg-10">
                          <div className="mb-6">
                            {/* titre */}
                            <h2 className="mb-0">Paramètres du compte</h2>
                          </div>
                          <div>
                            {/* titre */}
                            <h5 className="mb-4">Détails du compte</h5>
                            <div className="row">
                              <div className="col-lg-5">
                                {/* formulaire */}
                                <form>
                                  {/* champ nom */}
                                  <div className="mb-3">
                                    <label className="form-label">Nom</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Nigam Mishra"
                                    />
                                  </div>
                                  {/* champ email */}
                                  <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="exemple@gmail.com"
                                    />
                                  </div>
                                  {/* champ téléphone */}
                                  <div className="mb-5">
                                    <label className="form-label">Téléphone</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Numéro de téléphone"
                                    />
                                  </div>
                                  {/* bouton */}
                                  <div className="mb-3">
                                    <button className="btn btn-primary">
                                      Enregistrer les détails
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <hr className="my-10" />
                          <div className="pe-lg-14">
                            {/* titre */}
                            <h5 className="mb-4">Mot de passe</h5>
                            <form className=" row row-cols-1 row-cols-lg-2">
                              {/* nouveau mot de passe */}
                              <div className="mb-3 col">
                                <label className="form-label">
                                  Nouveau mot de passe
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="**********"
                                />
                              </div>
                              {/* mot de passe actuel */}
                              <div className="mb-3 col">
                                <label className="form-label">
                                  Mot de passe actuel
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="**********"
                                />
                              </div>
                              {/* lien de réinitialisation */}
                              <div className="col-12">
                                <p className="mb-4">
                                  Vous ne vous souvenez plus de votre mot de passe actuel ?
                                  <Link to="#"> Réinitialisez votre mot de passe.</Link>
                                </p>
                                <Link to="#" className="btn btn-primary">
                                  Enregistrer le mot de passe
                                </Link>
                              </div>
                            </form>
                          </div>
                          <hr className="my-10" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    </div>
  );
};

export default ParametresCompte;

import React, { useState, useEffect } from "react";
import signinimage from '../../images/signin-g.svg';
import { Link } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { useAuth } from "../../context/AuthContext";

const MyAccountSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);
  const { login, authError, setAuthError } = useAuth();

  useEffect(() => {
    setAuthError(null);
    setLocalError(null);
  }, [setAuthError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setAuthError(null);
    
    if (!email || !password) {
      setLocalError("Veuillez remplir tous les champs");
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <div>
        <ScrollToTop />
        <section className="my-lg-14 my-8">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                <img
                  src={signinimage}
                  alt="freshcart"
                  className="img-fluid"
                />
              </div>
              <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                <div className="mb-lg-9 mb-5">
                  <h1 className="mb-1 h2 fw-bold">Se connecter à Ecodattes</h1>
                  <p>Bon retour sur Ecodattes !</p>
                </div>
                
                {(authError || localError) && (
                  <div className="alert alert-danger" role="alert">
                    {authError || localError}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Adresse email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="Mot de passe"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        Mot de passe oublié ?{" "}
                        <Link to="/MyAccountForgetPassword">Réinitialiser</Link>
                      </div>
                    </div>
                    <div className="col-12 d-grid">
                      <button type="submit" className="btn btn-primary">
                        Se connecter
                      </button>
                    </div>
                    <div>
                      Vous n'avez pas de compte ?{" "}
                      <Link to="/MyAccountSignUp">Créer un compte</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyAccountSignIn;
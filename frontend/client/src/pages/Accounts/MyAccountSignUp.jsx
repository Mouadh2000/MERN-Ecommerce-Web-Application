import React, { useState } from "react";
import signupimage from "../../images/signup-g.svg";
import { Link, useNavigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { Form, Button, Image } from "react-bootstrap";
import { signup } from "../../Api/clientApi";
import Swal from "sweetalert2";


const MyAccountSignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    gender: "",
    address: "",
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage") {
      const file = files[0];
      setFormData({ ...formData, profileImage: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("uploadType", "ClientImage");
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
  
    try {
      const response = await signup(data);
      await Swal.fire({
        title: "Succès!",
        text: "Inscription réussie!",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/MyAccountSignIn");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
  
      const errorMessage = error.response?.data?.message || "Une erreur s'est produite. Veuillez réessayer.";
      
      await Swal.fire({
        title: "Erreur",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  

  return (
    <div>
      <ScrollToTop />
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
              <img src={signupimage} alt="freshcart" className="img-fluid" />
            </div>

            <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
              <div className="mb-lg-9 mb-5">
                <h1 className="mb-1 h2 fw-bold">Commencez vos achats</h1>
                <p>Bienvenue sur Ecodattes !</p>
              </div>

              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-3">
                  <div className="col">
                    <Form.Control
                      type="text"
                      placeholder="Prénom"
                      name="firstName"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <Form.Control
                      type="text"
                      placeholder="Nom"
                      name="lastName"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <Form.Control
                      type="text"
                      placeholder="Nom d'utilisateur"
                      name="username"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <Form.Control
                      type="email"
                      placeholder="Adresse email"
                      name="email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <Form.Control
                      type="tel"
                      placeholder="Numéro de téléphone"
                      name="phoneNumber"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <Form.Control
                      type="password"
                      placeholder="Mot de passe"
                      name="password"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <Form.Select name="gender" required onChange={handleChange}>
                      <option value="">Sélectionnez votre genre</option>
                      <option value="male">Homme</option>
                      <option value="female">Femme</option>
                    </Form.Select>
                  </div>
                  <div className="col-12">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Adresse"
                      name="address"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <Form.Group controlId="formFile">
                      <Form.Label>Image de profil</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        name="profileImage"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    {previewImage && (
                      <div className="mt-2">
                        <Image src={previewImage} rounded width={100} />
                      </div>
                    )}
                  </div>

                  <div className="col-12 d-grid">
                    <Button type="submit" variant="primary">
                      S'inscrire
                    </Button>
                    <span className="navbar-text mt-2">
                      Vous avez déjà un compte ?{" "}
                      <Link to="/MyAccountSignIn">Se connecter</Link>
                    </span>
                  </div>
                  <p>
                    <small>
                      En continuant, vous acceptez nos{" "}
                      <Link to="#!">Conditions d'utilisation</Link> et notre{" "}
                      <Link to="#!">Politique de confidentialité</Link>
                    </small>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAccountSignUp;